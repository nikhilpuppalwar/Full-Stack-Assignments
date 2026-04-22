const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        subscription: {
            type: mongoose.Schema.ObjectId,
            ref: 'Subscription',
        },
        mess: {
            type: mongoose.Schema.ObjectId,
            ref: 'Mess',
        },
        type: {
            type: String,
            enum: ['subscription', 'refund', 'settlement'],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ['UPI', 'Card', 'Wallet', 'Net Banking', 'Platform Account'],
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Success', 'Failed', 'Refunded'],
            default: 'Pending',
        },
        gatewayRef: {
            type: String, // Usually passed back from Razorpay / Paytm
        },
        breakdown: {
            basePrice: Number,
            tax: Number,
            discount: Number,
            platformFee: Number // Useful for settlements
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
