const express = require('express');
const router = express.Router();
const {
    createSubscription,
    getMySubscriptions,
    cancelSubscription
} = require('../controllers/subscriptionController');

const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('student'), createSubscription);
router.get('/my-subscriptions', protect, authorize('student'), getMySubscriptions);
router.post('/:id/cancel', protect, authorize('student'), cancelSubscription);

module.exports = router;
