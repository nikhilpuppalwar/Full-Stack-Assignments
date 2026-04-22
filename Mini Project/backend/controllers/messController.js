const Mess = require('../models/Mess');

// @desc    Get all messes (with filtering & pagination)
// @route   GET /api/messes
// @access  Public
exports.getMesses = async (req, res) => {
    try {
        let query;
        const reqQuery = { ...req.query };

        // Fields to exclude from filtering
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach((param) => delete reqQuery[param]);

        // Handle stringified operators ($gt, $gte, etc) -> example for price if needed
        let queryStr = JSON.stringify(reqQuery);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
        query = Mess.find(JSON.parse(queryStr));

        // Optional text Search on Name or Location/City
        if (req.query.search) {
            query = query.find({
                $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { 'location.city': { $regex: req.query.search, $options: 'i' } }
                ]
            });
        }

        // Only verified messes
        query = query.where('isVerified').equals(true);

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const total = await Mess.countDocuments(query);
        query = query.skip(startIndex).limit(limit);

        // Exec
        const messes = await query;

        // Pagination result
        const pagination = {};
        if (startIndex + limit < total) {
            pagination.next = { page: page + 1, limit };
        }
        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        res.status(200).json({
            success: true,
            count: messes.length,
            pagination,
            data: messes,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get single mess by ID
// @route   GET /api/messes/:id
// @access  Public
exports.getMess = async (req, res) => {
    try {
        const mess = await Mess.findById(req.params.id).populate({
            path: 'owner',
            select: 'fullName email phone' // Don't expose all info
        });

        if (!mess) {
            return res.status(404).json({ success: false, message: 'Mess not found' });
        }

        res.status(200).json({ success: true, data: mess });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get mess menu for a specific date or today
// @route   GET /api/messes/:id/menu
// @access  Public
exports.getMessMenu = async (req, res) => {
    try {
        const dateQuery = req.query.date ? new Date(req.query.date) : new Date();
        // Normalize to start of day
        dateQuery.setHours(0, 0, 0, 0);

        const mess = await Mess.findById(req.params.id);

        if (!mess) return res.status(404).json({ success: false, message: 'Mess not found' });

        const menuForDate = mess.menu.find(m => {
            const mDate = new Date(m.date);
            mDate.setHours(0, 0, 0, 0);
            return mDate.getTime() === dateQuery.getTime();
        });

        res.status(200).json({ success: true, data: menuForDate || { breakfast: [], lunch: [], dinner: [] } });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
}
