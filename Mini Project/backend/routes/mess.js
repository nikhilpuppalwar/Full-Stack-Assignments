const express = require('express');
const router = express.Router();
const { getMesses, getMess, getMessMenu } = require('../controllers/messController');

router.route('/').get(getMesses);
router.route('/:id').get(getMess);
router.route('/:id/menu').get(getMessMenu);

module.exports = router;
