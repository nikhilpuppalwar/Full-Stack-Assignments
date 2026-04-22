const Subscription = require('../models/Subscription');
const Mess = require('../models/Mess');
const Transaction = require('../models/Transaction');
const crypto = require('crypto');

// @desc    Create subscription (Student Checkout Step 1 & 2 combined logic)
// @route   POST /api/subscriptions
// @access  Private (Student)
exports.createSubscription = async (req, res) => {
    try {
        const { messId, planName, startDate, paymentMethod } = req.body;

        const mess = await Mess.findById(messId);
        if (!mess) return res.status(404).json({ success: false, message: 'Mess not found' });

        // Find the plan details
        const plan = mess.subscriptionPlans.find(p => p.name === planName);
        if (!plan) return res.status(400).json({ success: false, message: 'Invalid plan selected' });

        // Calculate End Date
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + plan.durationDays);

        // Generate unique QR string
        const qrToken = crypto.randomBytes(20).toString('hex');

        // Create Subscription
        const subscription = await Subscription.create({
            student: req.user.id,
            mess: messId,
            plan: {
                name: plan.name,
                mealsIncluded: plan.mealsIncluded,
                price: plan.price,
                durationDays: plan.durationDays
            },
            startDate: start,
            endDate: end,
            qrCode: qrToken,
            paymentInfo: {
                method: paymentMethod || 'Online',
                amount: plan.price,
                status: 'Completed' // Mocking successful payment for now
            }
        });

        // Create Transaction Record
        const transaction = await Transaction.create({
            user: req.user.id,
            subscription: subscription._id,
            mess: messId,
            type: 'subscription',
            amount: plan.price,
            paymentMethod: paymentMethod || 'Online',
            status: 'Success',
            breakdown: {
                basePrice: plan.price,
                platformFee: plan.price * 0.05 // 5% platform fee
            }
        });

        // Link transaction to subscription
        subscription.paymentInfo.transactionId = transaction._id;
        await subscription.save();

        // Increment mess subscriber count
        mess.subscribersCount += 1;
        await mess.save();

        res.status(201).json({ success: true, data: subscription });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get user subscriptions
// @route   GET /api/subscriptions/my-subscriptions
// @access  Private (Student)
exports.getMySubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find({ student: req.user.id })
            .populate('mess', 'name location photos rating')
            .sort('-createdAt');

        res.status(200).json({ success: true, count: subscriptions.length, data: subscriptions });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Cancel subscription
// @route   POST /api/subscriptions/:id/cancel
// @access  Private (Student)
exports.cancelSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
        }

        // Make sure user owns subscription
        if (subscription.student.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        if (subscription.status !== 'Active') {
            return res.status(400).json({ success: false, message: 'Subscription is already cancelled or expired' });
        }

        subscription.status = 'Cancelled';
        await subscription.save();

        // Generate Refund Transaction (Mock 15% cancellation fee logic)
        const refundAmount = subscription.plan.price * 0.85;

        await Transaction.create({
            user: req.user.id,
            subscription: subscription._id,
            mess: subscription.mess,
            type: 'refund',
            amount: refundAmount,
            paymentMethod: subscription.paymentInfo.method,
            status: 'Pending',
        });

        // Reduce mess subscriber count
        const mess = await Mess.findById(subscription.mess);
        if (mess && mess.subscribersCount > 0) {
            mess.subscribersCount -= 1;
            await mess.save();
        }

        res.status(200).json({ success: true, data: subscription, message: 'Subscription cancelled successfully' });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
