const express = require('express');
const router = express.Router();
const {
    getPendingVerifications,
    verifyOwner,
    getAnalytics,
    getDisputes
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

router.get('/pending-verifications', getPendingVerifications);
router.put('/verify-owner/:id', verifyOwner);
router.get('/analytics', getAnalytics);
router.get('/disputes', getDisputes);

module.exports = router;
