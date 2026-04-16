// routes/inquiries.js
const express  = require('express');
const router   = express.Router();
const { Inquiries, Products, Users } = require('../db');
const { isLoggedIn } = require('../middleware/auth');

router.post('/', isLoggedIn, (req, res) => {
  try {
    const { productId, message } = req.body;
    if (!message || !message.trim()) { req.flash('error', 'Message cannot be empty.'); return res.redirect(`/products/${productId}`); }
    const product = Products.findById(productId);
    if (!product) { req.flash('error', 'Listing not found.'); return res.redirect('/products'); }
    const sender = Users.findById(req.session.userId);
    Inquiries.create({
      productId, senderId: sender.id, senderName: sender.name, senderEmail: sender.email,
      recipientId: product.seller.id, recipientName: product.seller.name, message: message.trim()
    });
    req.flash('success', 'Message sent to seller!');
    res.redirect(`/products/${productId}`);
  } catch (err) { req.flash('error', 'Failed to send.'); res.redirect('/products'); }
});

router.get('/inbox', isLoggedIn, (req, res, next) => {
  try {
    const inquiries = Inquiries.inbox(req.session.userId);
    Inquiries.markAllRead(req.session.userId);
    res.render('inquiries/inbox', { title: 'Inbox', inquiries });
  } catch (err) { next(err); }
});

router.get('/sent', isLoggedIn, (req, res, next) => {
  try {
    const inquiries = Inquiries.sent(req.session.userId);
    res.render('inquiries/sent', { title: 'Sent Messages', inquiries });
  } catch (err) { next(err); }
});

router.get('/unread-count', isLoggedIn, (req, res) => {
  const count = Inquiries.unreadCount(req.session.userId);
  res.json({ count });
});

module.exports = router;
