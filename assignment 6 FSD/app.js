
const express  = require('express');
const session  = require('express-session');
const flash    = require('connect-flash');
const override = require('method-override');
const path     = require('path');

const app = express();

/* ── View Engine ─────────────────────────── */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* ── Middleware ──────────────────────────── */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(override('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/* ── Session ─────────────────────────────── */
app.use(session({
  secret: 'bazaar-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 7 days
}));

/* ── Flash Messages ──────────────────────── */
app.use(flash());

/* ── Global Template Variables ───────────── */
app.use((req, res, next) => {
  res.locals.success     = req.flash('success');
  res.locals.error       = req.flash('error');
  res.locals.currentUser = req.session.userId   || null;
  res.locals.userName    = req.session.userName || null;
  res.locals.isAdmin     = req.session.isAdmin  || false;
  next();
});

/* ── Routes ──────────────────────────────── */
app.use('/',         require('./routes/index'));
app.use('/products', require('./routes/products'));
app.use('/auth',     require('./routes/auth'));
app.use('/wishlist', require('./routes/wishlist'));
app.use('/inquiries',require('./routes/inquiries'));

/* ── 404 Handler ─────────────────────────── */
app.use((req, res) => res.status(404).render('404'));

/* ── Error Handler ───────────────────────── */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: err.message || 'Something went wrong.' });
});

/* ── Start Server ────────────────────────── */
const PORT = 3000;
app.listen(PORT, () => {
  console.log('');
  console.log('  🛒  BAZAAR is running!');
  console.log(`  👉  Open: http://localhost:${PORT}`);
  console.log('');
  console.log('  Demo accounts:');
  console.log('  Admin →  admin@bazaar.com   / Admin@123');
  console.log('  User  →  rahul@example.com  / Admin@123');
  console.log('');
});
