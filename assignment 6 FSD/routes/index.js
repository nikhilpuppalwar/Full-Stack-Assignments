const express  = require('express');
const router   = express.Router();
const { Products } = require('../db');

const CATEGORIES = ['Cars','Bikes','Electronics','Furniture','Clothing','Books','Sports','Other'];

router.get('/', (req, res, next) => {
  try {
    const featured      = Products.featured(3);
    const latest        = Products.latest(8);
    const totalListings = Products.all().filter(p => !p.isSold).length;
    res.render('index', { title: 'Bazaar — Buy & Sell Used Items', featured, latest, totalListings, categories: CATEGORIES });
  } catch (err) { next(err); }
});

module.exports = router;
