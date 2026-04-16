// Middleware: block access if not logged in
exports.isLoggedIn = (req, res, next) => {
  if (req.session.userId) return next();
  req.flash('error', 'Please log in to continue.');
  res.redirect('/auth/login');
};

// Middleware: block if not admin
exports.isAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next();
  req.flash('error', 'Admin access required.');
  res.redirect('/');
};

// Middleware: redirect away if already logged in
exports.isGuest = (req, res, next) => {
  if (!req.session.userId) return next();
  res.redirect('/');
};
