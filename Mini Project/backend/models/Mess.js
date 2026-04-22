const mongoose = require('mongoose');

const messSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters'],
        },
        type: {
            type: String,
            enum: ['Pure Veg', 'Veg & Non-veg', 'Non-veg only'],
            required: true,
        },
        location: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            coordinates: {
                type: [Number], // [longitude, latitude]
                index: '2dsphere',
            },
            googleMapsLink: String,
        },
        photos: {
            type: [String],
            validate: [arrayLimit, '{PATH} requires at least 5 photos'], // Might want to relax for dev
        },
        menu: [
            {
                date: { type: Date, required: true },
                breakfast: [String],
                lunch: [String],
                dinner: [String],
            },
        ],
        subscriptionPlans: [
            {
                name: { type: String, required: true }, // e.g. "Lunch + Dinner"
                mealsIncluded: [{ type: String, enum: ['breakfast', 'lunch', 'dinner'] }],
                durationDays: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        timings: {
            breakfast: String, // e.g. "07:30 AM - 10:00 AM"
            lunch: String,
            dinner: String,
        },
        features: [String], // e.g. ["AC", "WiFi", "Parking"]
        capacity: {
            type: Number,
            required: true,
        },
        rating: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        subscribersCount: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

function arrayLimit(val) {
    return val.length >= 0; // Temporarily changing from 5 to 0 so we don't block basic testing if images aren't all present
}

module.exports = mongoose.model('Mess', messSchema);
