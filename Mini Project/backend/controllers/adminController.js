const User = require('../models/User');
const Mess = require('../models/Mess');
const Transaction = require('../models/Transaction');

// @desc    Get all platform unverified owners
// @route   GET /api/admin/pending-verifications
// @access  Private (Admin)
exports.getPendingVerifications = async (req, res) => {
    try {
        const pendingOwners = await User.find({ role: 'owner', isVerified: false });
        res.status(200).json({ success: true, count: pendingOwners.length, data: pendingOwners });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Verify/Approve Owner
// @route   PUT /api/admin/verify-owner/:id
// @access  Private (Admin)
exports.verifyOwner = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user || user.role !== 'owner') {
            return res.status(404).json({ success: false, message: 'Owner not found' });
        }

        user.isVerified = true;
        await user.save();

        // Optionally mark their Mess as verified too if exists
        await Mess.updateMany({ owner: user._id }, { isVerified: true });

        res.status(200).json({ success: true, message: 'Owner verified successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// @desc    Get Platform Overview / Analytics (Gross metrics)
// @route   GET /api/admin/analytics
// @access  Private (Admin)
exports.getAnalytics = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalMesses = await Mess.countDocuments();

        // Quick aggregation on transactions for total platform revenue
        const revData = await Transaction.aggregate([
            { $match: { status: 'Success' } },
            { $group: { _id: null, totalVolume: { $sum: "$amount" }, platformRevenue: { $sum: "$breakdown.platformFee" } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalMesses,
                financials: revData[0] || { totalVolume: 0, platformRevenue: 0 }
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// @desc    Manage Disputes/Support
// @route   GET /api/admin/disputes
// @access  Private (Admin)
exports.getDisputes = async (req, res) => {
    // Scaffolded for Dispute Model which was abstracted into PRD but wasn't explicit in core schema list
    res.status(200).json({ success: true, message: 'Dispute logic placeholder' });
}
