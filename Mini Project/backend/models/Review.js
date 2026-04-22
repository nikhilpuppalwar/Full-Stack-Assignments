const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        mess: {
            type: mongoose.Schema.ObjectId,
            ref: 'Mess',
            required: true,
        },
        subscription: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subscription',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        title: {
            type: String,
            maxlength: 100,
        },
        reviewText: {
            type: String,
            required: true,
            minlength: 50,
            maxlength: 1000,
        },
        photos: [String],
        helpfulCount: {
            type: Number,
            default: 0,
        },
        helpfulBy: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            }
        ],
        ownerResponse: {
            text: String,
            date: Date,
        },
        verifiedPurchase: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Prevent user from submitting more than one review per mess
reviewSchema.index({ mess: 1, student: 1 }, { unique: true });

// Static method to get avg rating and save
reviewSchema.statics.getAverageRating = async function (messId) {
    const obj = await this.aggregate([
        {
            $match: { mess: messId }
        },
        {
            $group: {
                _id: '$mess',
                averageRating: { $avg: '$rating' },
                ratingCount: { $sum: 1 }
            }
        }
    ]);

    try {
        await this.model('Mess').findByIdAndUpdate(messId, {
            'rating.average': obj[0] ? obj[0].averageRating : 0,
            'rating.count': obj[0] ? obj[0].ratingCount : 0,
        });
    } catch (err) {
        console.error(err);
    }
};

// Call getAverageRating after save
reviewSchema.post('save', function () {
    this.constructor.getAverageRating(this.mess);
});

// Call getAverageRating before remove
reviewSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.mess);
});

module.exports = mongoose.model('Review', reviewSchema);
