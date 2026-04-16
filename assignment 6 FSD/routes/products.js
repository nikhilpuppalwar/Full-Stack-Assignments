const express  = require('express');
const router   = express.Router();
const { Products, Users } = require('../db');
const { isLoggedIn } = require('../middleware/auth');
const upload   = require('../middleware/upload');

const CATEGORIES = ['Cars','Bikes','Electronics','Furniture','Clothing','Books','Sports','Other'];
const CONDITIONS = ['Like New','Good','Fair','For Parts'];

/* ── Browse all products ─────────────────── */
router.get('/', (req, res, next) => {
  try {
    const { search='', category='All', condition='All', minPrice='', maxPrice='', sort='newest', page=1 } = req.query;
    const { products, total, totalPages } = Products.search({
      search, category, condition, minPrice, maxPrice, sort, page: parseInt(page), perPage: 12
    });
    res.render('products/index', {
      title: 'Browse Listings',
      products, total, totalPages,
      currentPage: parseInt(page) || 1,
      categories: ['All', ...CATEGORIES],
      conditions: ['All', ...CONDITIONS],
      search, category, condition, minPrice, maxPrice, sort
    });
  } catch (err) { next(err); }
});

/* ── New listing form ────────────────────── */
router.get('/new', isLoggedIn, (req, res) => {
  res.render('products/new', { title: 'Post a Listing', categories: CATEGORIES, conditions: CONDITIONS });
});

/* ── My listings ─────────────────────────── */
router.get('/my-listings', isLoggedIn, (req, res, next) => {
  try {
    const products = Products.byUser(req.session.userId);
    res.render('products/my-listings', { title: 'My Listings', products });
  } catch (err) { next(err); }
});

/* ── Create listing ──────────────────────── */
router.post('/', isLoggedIn, upload.single('image'), (req, res, next) => {
  try {
    const { title, category, price, condition, description, location, phone } = req.body;
    if (!title || !category || !price || !description) {
      req.flash('error', 'Please fill in all required fields.');
      return res.redirect('/products/new');
    }
    const user = Users.findById(req.session.userId);
    const product = Products.create({
      title, category, price, condition, description, location,
      image: req.file ? `/uploads/${req.file.filename}` : '/images/placeholder.png',
      seller: { id: user.id, name: user.name, email: user.email, phone: phone || user.phone }
    });
    req.flash('success', 'Listing posted successfully!');
    res.redirect(`/products/${product.id}`);
  } catch (err) { next(err); }
});

/* ── Show single product ─────────────────── */
router.get('/:id', (req, res, next) => {
  try {
    const product = Products.findById(req.params.id);
    if (!product) { req.flash('error', 'Listing not found.'); return res.redirect('/products'); }

    Products.incrementViews(product.id);
    const related   = Products.related(product.id, product.category);
    const isSeller  = req.session.userId && product.seller.id === req.session.userId;

    let inWishlist = false;
    if (req.session.userId) {
      const user = Users.findById(req.session.userId);
      inWishlist = user && user.wishlist.includes(product.id);
    }

    res.render('products/show', { title: product.title, product, related, isSeller, inWishlist });
  } catch (err) { next(err); }
});

/* ── Edit form ───────────────────────────── */
router.get('/:id/edit', isLoggedIn, (req, res, next) => {
  try {
    const product = Products.findById(req.params.id);
    if (!product) { req.flash('error', 'Not found.'); return res.redirect('/products'); }
    if (product.seller.id !== req.session.userId && !req.session.isAdmin) {
      req.flash('error', 'You can only edit your own listings.'); return res.redirect(`/products/${product.id}`);
    }
    res.render('products/edit', { title: `Edit: ${product.title}`, product, categories: CATEGORIES, conditions: CONDITIONS });
  } catch (err) { next(err); }
});

/* ── Update listing ──────────────────────── */
router.put('/:id', isLoggedIn, upload.single('image'), (req, res, next) => {
  try {
    const product = Products.findById(req.params.id);
    if (!product) { req.flash('error', 'Not found.'); return res.redirect('/products'); }
    if (product.seller.id !== req.session.userId && !req.session.isAdmin) {
      req.flash('error', 'Unauthorised.'); return res.redirect(`/products/${product.id}`);
    }
    const { title, category, price, condition, description, location, phone, isSold, featured } = req.body;
    const changes = {
      title: title.trim(), category, price: Number(price),
      condition, description: description.trim(),
      location: location ? location.trim() : 'Not specified',
      isSold:   isSold === 'on',
      'seller.phone': phone ? phone.trim() : product.seller.phone
    };
    if (req.session.isAdmin) changes.featured = featured === 'on';
    if (req.file) changes.image = `/uploads/${req.file.filename}`;

    // Merge seller.phone correctly
    const updated = { ...product, ...changes, seller: { ...product.seller, phone: phone ? phone.trim() : product.seller.phone } };
    delete updated['seller.phone'];
    Products.update(product.id, updated);

    req.flash('success', 'Listing updated!');
    res.redirect(`/products/${product.id}`);
  } catch (err) { next(err); }
});

/* ── Delete listing ──────────────────────── */
router.delete('/:id', isLoggedIn, (req, res, next) => {
  try {
    const product = Products.findById(req.params.id);
    if (!product) { req.flash('error', 'Not found.'); return res.redirect('/products'); }
    if (product.seller.id !== req.session.userId && !req.session.isAdmin) {
      req.flash('error', 'Unauthorised.'); return res.redirect(`/products/${product.id}`);
    }
    Products.delete(product.id);
    req.flash('success', 'Listing deleted.');
    res.redirect('/products');
  } catch (err) { next(err); }
});

/* ── Toggle Sold ─────────────────────────── */
router.post('/:id/sold', isLoggedIn, (req, res, next) => {
  try {
    const product = Products.findById(req.params.id);
    if (!product) return res.redirect('/products');
    if (product.seller.id !== req.session.userId && !req.session.isAdmin) {
      req.flash('error', 'Unauthorised.'); return res.redirect(`/products/${product.id}`);
    }
    Products.update(product.id, { isSold: !product.isSold });
    req.flash('success', product.isSold ? 'Listing reactivated.' : 'Marked as sold.');
    res.redirect(`/products/${product.id}`);
  } catch (err) { next(err); }
});

module.exports = router;
