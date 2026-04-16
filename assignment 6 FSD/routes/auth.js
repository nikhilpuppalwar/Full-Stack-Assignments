const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const { Users, Products } = require('../db');
const { isLoggedIn, isGuest } = require('../middleware/auth');

/* ── Register ────────────────────────────── */
router.get('/register', isGuest, (req, res) => {
  res.render('auth/register', { title: 'Create Account' });
});

router.post('/register', isGuest, async (req, res) => {
  const { name, email, password, confirmPassword, phone } = req.body;
  try {
    if (!name || !email || !password) { req.flash('error', 'All fields are required.'); return res.redirect('/auth/register'); }
    if (password !== confirmPassword)  { req.flash('error', 'Passwords do not match.'); return res.redirect('/auth/register'); }
    if (password.length < 6)          { req.flash('error', 'Password must be at least 6 characters.'); return res.redirect('/auth/register'); }
    if (Users.findByEmail(email))     { req.flash('error', 'Email already registered.'); return res.redirect('/auth/register'); }

    const hashed = await bcrypt.hash(password, 12);
    const user   = Users.create({ name, email, password: hashed, phone: phone || '' });

    req.session.userId   = user.id;
    req.session.userName = user.name;
    req.session.isAdmin  = user.isAdmin;
    req.flash('success', `Welcome to Bazaar, ${user.name}!`);
    res.redirect('/');
  } catch (err) { req.flash('error', 'Registration failed.'); res.redirect('/auth/register'); }
});

/* ── Login ───────────────────────────────── */
router.get('/login', isGuest, (req, res) => {
  res.render('auth/login', { title: 'Sign In' });
});

router.post('/login', isGuest, async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) { req.flash('error', 'Email and password required.'); return res.redirect('/auth/login'); }
    const user = Users.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      req.flash('error', 'Invalid email or password.'); return res.redirect('/auth/login');
    }
    req.session.userId   = user.id;
    req.session.userName = user.name;
    req.session.isAdmin  = user.isAdmin;
    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect('/');
  } catch (err) { req.flash('error', 'Login failed.'); res.redirect('/auth/login'); }
});

/* ── Logout ──────────────────────────────── */
router.post('/logout', isLoggedIn, (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

/* ── Profile ─────────────────────────────── */
router.get('/profile', isLoggedIn, (req, res, next) => {
  try {
    const user     = Users.findById(req.session.userId);
    const listings = Products.byUser(req.session.userId);
    const wishlistItems = user.wishlist
      .map(id => Products.findById(id))
      .filter(Boolean);
    res.render('auth/profile', { title: 'My Profile', user, listings, wishlistItems });
  } catch (err) { next(err); }
});

/* ── Update Profile ──────────────────────── */
router.put('/profile', isLoggedIn, (req, res, next) => {
  try {
    const { name, phone } = req.body;
    Users.update(req.session.userId, { name: name.trim(), phone: phone.trim() });
    req.session.userName = name.trim();
    req.flash('success', 'Profile updated!');
    res.redirect('/auth/profile');
  } catch (err) { next(err); }
});

module.exports = router;
