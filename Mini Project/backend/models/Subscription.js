const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
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
        plan: {
            name: { type: String, required: true },
            mealsIncluded: [{ type: String, enum: ['breakfast', 'lunch', 'dinner'] }],
            price: { type: Number, required: true },
            durationDays: { type: Number, required: true }
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        qrCode: {
            type: String, // String representation of the QR token linking to ID
            required: true,
            unique: true,
        },
        paymentInfo: {
            transactionId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Transaction',
            },
            method: String,
            amount: Number,
            status: {
                type: String,
                enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
                default: 'Pending'
            }
        },
        status: {
            type: String,
            enum: ['Active', 'Expired', 'Cancelled'],
            default: 'Active',
        },
        attendance: [
            {
                date: { type: Date, required: true },
                meal: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
                checkedIn: { type: Boolean, default: false },
                timestamp: Date,
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
