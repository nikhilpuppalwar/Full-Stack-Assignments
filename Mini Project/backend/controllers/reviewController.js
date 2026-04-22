const Review = require('../models/Review');
const Subscription = require('../models/Subscription');
const Mess = require('../models/Mess');

// @desc    Add a review (Student only, requires past/active subscription)
// @route   POST /api/messes/:messId/reviews
// @access  Private (Student)
exports.addReview = async (req, res) => {
    try {
        req.body.mess = req.params.messId;
        req.body.student = req.user.id;

        // Check if user has an active or past subscription to this mess
        const subscription = await Subscription.findOne({
            student: req.user.id,
            mess: req.params.messId
        }).sort('-createdAt'); // Latest subscription

        if (!subscription) {
            return res.status(403).json({ success: false, message: 'Must have a subscription to review this mess' });
        }

        req.body.subscription = subscription._id;

        // Create review
        const review = await Review.create(req.body);

        res.status(201).json({ success: true, data: review });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this mess' });
        }
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get reviews for a mess
// @route   GET /api/messes/:messId/reviews
// @access  Public
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ mess: req.params.messId })
            .populate('student', 'fullName profilePhoto')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
