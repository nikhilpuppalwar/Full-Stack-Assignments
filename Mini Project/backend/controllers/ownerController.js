const Mess = require('../models/Mess');
const Subscription = require('../models/Subscription');

// @desc    Create or update mess profile
// @route   POST /api/owner/mess
// @access  Private (Owner, Verified)
exports.createUpdateMess = async (req, res) => {
    try {
        const { name, description, type, location, timings, capacity, features, subscriptionPlans } = req.body;

        const messFields = {
            owner: req.user.id,
            name,
            description,
            type,
            location,
            timings,
            capacity,
            features,
            subscriptionPlans
        };

        let mess = await Mess.findOne({ owner: req.user.id });

        if (mess) {
            // Update
            mess = await Mess.findOneAndUpdate(
                { owner: req.user.id },
                { $set: messFields },
                { new: true, runValidators: true }
            );
            return res.status(200).json({ success: true, data: mess });
        }

        // Create
        mess = await Mess.create(messFields);
        res.status(201).json({ success: true, data: mess });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Set Daily/Weekly Menu
// @route   POST /api/owner/mess/menu
// @access  Private (Owner, Verified)
exports.updateMenu = async (req, res) => {
    try {
        const { menus } = req.body; // Array of { date, breakfast, lunch, dinner }

        const mess = await Mess.findOne({ owner: req.user.id });
        if (!mess) return res.status(404).json({ success: false, message: 'Mess not found' });

        // Update logic: Replace matching dates or push new ones
        menus.forEach(incomingMenu => {
            const mDate = new Date(incomingMenu.date);
            mDate.setHours(0, 0, 0, 0);

            const existingIdx = mess.menu.findIndex(m => {
                let eDate = new Date(m.date);
                eDate.setHours(0, 0, 0, 0);
                return eDate.getTime() === mDate.getTime();
            });

            if (existingIdx !== -1) {
                mess.menu[existingIdx] = incomingMenu;
            } else {
                mess.menu.push(incomingMenu);
            }
        });

        await mess.save();
        res.status(200).json({ success: true, data: mess.menu });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// @desc    Verify QR Code / Check-in Student
// @route   POST /api/owner/scan-qr
// @access  Private (Owner, Verified)
exports.scanQrCode = async (req, res) => {
    try {
        const { qrToken, mealType } = req.body; // mealType: breakfast/lunch/dinner

        const subscription = await Subscription.findOne({ qrCode: qrToken }).populate('student', 'fullName profilePhoto');

        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Invalid or Expired QR Code' });
        }

        // Check if subscription belongs to THIS owner's mess
        const mess = await Mess.findOne({ owner: req.user.id });
        if (!mess || subscription.mess.toString() !== mess._id.toString()) {
            return res.status(403).json({ success: false, message: 'QR Code not valid for this Mess' });
        }

        // Validate subscription status
        if (subscription.status !== 'Active' || new Date() > new Date(subscription.endDate)) {
            return res.status(400).json({ success: false, message: 'Subscription is no longer active' });
        }

        // Check if meal is included in their plan
        if (!subscription.plan.mealsIncluded.includes(mealType)) {
            return res.status(400).json({ success: false, message: `${mealType} is not included in this student's plan` });
        }

        // See if they already scanned today for this meal
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const alreadyCheckedIn = subscription.attendance.find(a => {
            const aDate = new Date(a.date);
            aDate.setHours(0, 0, 0, 0);
            return aDate.getTime() === today.getTime() && a.meal === mealType;
        });

        if (alreadyCheckedIn) {
            return res.status(400).json({ success: false, message: `Student already checked in for ${mealType} today` });
        }

        // Add Check-in Record
        subscription.attendance.push({
            date: new Date(),
            meal: mealType,
            checkedIn: true,
            timestamp: new Date()
        });

        await subscription.save();

        res.status(200).json({
            success: true,
            message: 'Check-in successful',
            student: subscription.student
        });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

// @desc    Get Owner Dashboard Stats
// @route   GET /api/owner/dashboard
// @access  Private (Owner, Verified)
exports.getOwnerDashboard = async (req, res) => {
    try {
        const mess = await Mess.findOne({ owner: req.user.id });
        if (!mess) return res.status(404).json({ success: false, message: 'Mess not found' });

        // Get active subscribers count
        const activeSubscribersCount = await Subscription.countDocuments({
            mess: mess._id,
            status: 'Active'
        });

        // Basic revenue calculation: sum of all completed subscription payments for this mess
        const subscriptions = await Subscription.find({ mess: mess._id });
        const totalRevenue = subscriptions.reduce((acc, sub) => {
            if (sub.paymentInfo && sub.paymentInfo.amount && sub.paymentInfo.status === 'Completed') {
                return acc + sub.paymentInfo.amount;
            }
            return acc;
        }, 0);

        // Fetch recent subscriptions
        const recentSubs = await Subscription.find({ mess: mess._id })
            .populate('student', 'fullName')
            .sort({ createdAt: -1 })
            .limit(5);

        const recentSubscribers = recentSubs.map(sub => ({
            _id: sub._id,
            name: sub.student?.fullName || 'Unknown',
            plan: sub.plan.name,
            status: sub.status,
            startDate: new Date(sub.startDate).toLocaleDateString()
        }));

        res.status(200).json({
            success: true,
            data: {
                activeSubscribers: activeSubscribersCount,
                monthlyRevenue: totalRevenue,
                averageRating: mess.rating.average || 0,
                pendingReviews: 0, // Placeholder
                recentSubscribers
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get Subscribers
// @route   GET /api/owner/subscribers
// @access  Private (Owner, Verified)
exports.getSubscribers = async (req, res) => {
    try {
        const mess = await Mess.findOne({ owner: req.user.id });
        if (!mess) return res.status(404).json({ success: false, message: 'Mess not found' });

        const subscribers = await Subscription.find({ mess: mess._id })
            .populate('student', 'fullName email phone profilePhoto')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: subscribers });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get Revenue
// @route   GET /api/owner/revenue
// @access  Private (Owner, Verified)
exports.getRevenue = async (req, res) => {
    try {
        const mess = await Mess.findOne({ owner: req.user.id });
        if (!mess) return res.status(404).json({ success: false, message: 'Mess not found' });

        const subscriptions = await Subscription.find({ mess: mess._id })
            .populate('student', 'fullName')
            .sort({ createdAt: -1 });

        const transactions = subscriptions.filter(sub => sub.paymentInfo && sub.paymentInfo.amount).map(sub => ({
            transactionId: sub.paymentInfo.transactionId || sub._id,
            date: sub.createdAt,
            student: sub.student?.fullName,
            plan: sub.plan.name,
            amount: sub.paymentInfo.amount,
            status: sub.paymentInfo.status
        }));

        const totalRevenue = transactions.reduce((acc, tx) => tx.status === 'Completed' ? acc + tx.amount : acc, 0);

        res.status(200).json({
            success: true,
            data: {
                totalRevenue,
                transactions
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
