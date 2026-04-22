const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['signup', 'password-reset'],
            default: 'signup',
        },
        attempts: {
            type: Number,
            default: 0,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 600, // 10 minutes document expiration
        },
    }
);

module.exports = mongoose.model('OTP', otpSchema);
