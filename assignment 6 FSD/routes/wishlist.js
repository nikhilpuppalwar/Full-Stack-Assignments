// routes/wishlist.js
const express  = require('express');
const router   = express.Router();
const { Users, Products } = require('../db');
const { isLoggedIn } = require('../middleware/auth');

router.post('/toggle/:productId', isLoggedIn, (req, res) => {
  try {
    const status = Users.toggleWishlist(req.session.userId, req.params.productId);
    res.json({ status, message: status === 'added' ? 'Added to wishlist' : 'Removed from wishlist' });
  } catch (err) { res.status(500).json({ error: 'Failed.' }); }
});

router.get('/', isLoggedIn, (req, res, next) => {
  try {
    const user  = Users.findById(req.session.userId);
    const items = user.wishlist.map(id => Products.findById(id)).filter(Boolean);
    res.render('wishlist/index', { title: 'My Wishlist', items });
  } catch (err) { next(err); }
});

module.exports = router;
