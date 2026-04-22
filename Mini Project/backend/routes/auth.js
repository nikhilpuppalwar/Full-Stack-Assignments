const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
    signupStep1,
    signupStep2,
    sendOtp,
    verifyOtp,
    login,
    refreshToken,
    logout
} = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

// Rate limiters for sensitive routes
const otpLimiter = rateLimit({
    windowMs: parseInt(process.env.OTP_RATE_LIMIT_WINDOW_MS || 60000), // 1 minute
    max: parseInt(process.env.OTP_RATE_LIMIT_MAX_REQUESTS || 3), // 3 requests per minute
    message: { success: false, message: 'Too many OTP requests from this IP, please try again after a minute' }
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 10, // 10 requests per 15 mins
    message: { success: false, message: 'Too many login attempts, please try again after 15 minutes' }
});

// Input validation rules
const registerValidation = [
    body('fullName', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('phone', 'Please include a valid 10-digit phone number').matches(/^[6-9]\d{9}$/),
    body('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
];

const loginValidation = [
    body('emailOrPhone', 'Please include a valid email or phone').not().isEmpty(),
    body('password', 'Password is required').exists()
];

// Auth Routes Based on PRD
router.post('/signup/step1', registerValidation, signupStep1);
router.post('/signup/step2', signupStep2);
router.post('/send-otp', otpLimiter, sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginLimiter, loginValidation, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

module.exports = router;
