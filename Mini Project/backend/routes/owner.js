const express = require('express');
const router = express.Router();
const {
    createUpdateMess,
    updateMenu,
    scanQrCode,
    getOwnerDashboard,
    getSubscribers,
    getRevenue
} = require('../controllers/ownerController');

const { protect, authorize, verifiedOwnerOnly } = require('../middleware/authMiddleware');

router.post('/mess', protect, authorize('owner'), verifiedOwnerOnly, createUpdateMess);
router.post('/mess/menu', protect, authorize('owner'), verifiedOwnerOnly, updateMenu);
router.post('/scan-qr', protect, authorize('owner'), verifiedOwnerOnly, scanQrCode);

router.get('/dashboard', protect, authorize('owner'), verifiedOwnerOnly, getOwnerDashboard);
router.get('/subscribers', protect, authorize('owner'), verifiedOwnerOnly, getSubscribers);
router.get('/revenue', protect, authorize('owner'), verifiedOwnerOnly, getRevenue);

module.exports = router;
