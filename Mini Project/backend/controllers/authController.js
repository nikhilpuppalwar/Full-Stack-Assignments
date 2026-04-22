const User = require('../models/User');
const OTP = require('../models/OTP');
const { validationResult } = require('express-validator');
const sendEmail = require('../utils/emailService');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

// @desc    Step 1: Save Personal Details (Returns temp token or relies on client holding state)
// @route   POST /api/auth/signup/step1
// @access  Public
exports.signupStep1 = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullName, email, phone, password } = req.body;

    try {
        // Check if email or phone already exists
        let userExists = await User.findOne({ $or: [{ email }, { phone }] });

        if (userExists) {
            if (userExists.email === email) {
                return res.status(400).json({ success: false, message: 'Email already registered' });
            }
            return res.status(400).json({ success: false, message: 'Phone already registered' });
        }

        // In a stateless JWT flow, we can just return success and let the frontend hold the data,
        // then send everything at once in Step 3 OR we save it in a temp DB / Redis. 
        // To keep it simple per PRD, frontend holds state and sends everything at verify-otp or send-otp.
        res.status(200).json({
            success: true,
            message: 'Step 1 complete. Proceed to Step 2.',
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Step 2: Role Selection
// @route   POST /api/auth/signup/step2
// @access  Public
exports.signupStep2 = async (req, res) => {
    const { role } = req.body;
    if (!['student', 'owner'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Invalid role selected' });
    }

    res.status(200).json({
        success: true,
        message: 'Role selected. Proceed to OTP generation.',
    });
};

// @desc    Step 3: Generate and Send OTP
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOtp = async (req, res) => {
    const { email, userName } = req.body;

    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    try {
        // Determine OTP strategy
        const otpMode = process.env.OTP_MODE || 'demo';
        let generatedOtp;

        if (otpMode === 'demo') {
            generatedOtp = process.env.DEMO_OTP || '123456';
        } else {
            generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        }

        // Save OTP to database (upsert to handle resends)
        await OTP.findOneAndUpdate(
            { email },
            { email, otp: generatedOtp, type: 'signup', attempts: 0, isVerified: false },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // Send email if mode is email or both
        if (otpMode === 'email' || otpMode === 'both') {
            try {
                const message = `Hi ${userName || 'User'},\n\nYour OTP for MessConnect registration is: ${generatedOtp}\n\nThis code will expire in 10 minutes.\n\nThank you!`;
                await sendEmail({
                    email,
                    subject: 'MessConnect Verification Code',
                    message,
                });

                if (otpMode === 'both') {
                    console.log(`[Both Mode fallback] OTP generated: ${generatedOtp}`);
                }
            } catch (err) {
                console.error('Error sending email:', err);
                if (otpMode === 'email') {
                    return res.status(500).json({ success: false, message: 'Email could not be sent' });
                }
            }
        } else {
            // Demo log
            console.log(`[Demo API] OTP for ${email} is ${generatedOtp}`);
        }

        res.status(200).json({ success: true, message: 'OTP sent to email.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Step 3.B: Verify OTP & Create User
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOtp = async (req, res) => {
    const { email, otp, fullName, phone, password, role } = req.body;
    console.log(`[verifyOtp DEBUG] Incoming request for email: "${email}", otp: "${otp}"`);

    try {
        const otpRecord = await OTP.findOne({ email });
        console.log(`[verifyOtp DEBUG] Found otpRecord:`, otpRecord);

        if (!otpRecord) {
            return res.status(400).json({ success: false, message: 'OTP expired or invalid' });
        }

        if (otpRecord.attempts >= 3) {
            await OTP.deleteOne({ email });
            return res.status(400).json({ success: false, message: 'Too many failed attempts. Please request a new OTP.' });
        }

        const isMatch = otp === otpRecord.otp;
        let fallbackHit = false;

        // Fallback: if 'both' mode and they use demo pass instead of email
        if (!isMatch && (process.env.OTP_MODE === 'both' || process.env.OTP_MODE === 'demo') && otp === process.env.DEMO_OTP) {
            fallbackHit = true;
        }

        if (!isMatch && !fallbackHit) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // OTP Verified! 
        await OTP.deleteOne({ email });

        // Create the User
        const user = await User.create({
            fullName,
            email,
            phone,
            password,
            role,
            isVerified: true,
        });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id, false);

        // Save refresh token
        user.refreshTokens.push(refreshToken);
        await user.save();

        res.status(201).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { emailOrPhone, password, rememberMe } = req.body;

    try {
        // Check for user
        const user = await User.findOne({
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
        }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id, rememberMe);

        // Filter tokens for size keeping (e.g. max 5 devices)
        if (user.refreshTokens.length > 5) user.refreshTokens.shift();

        user.refreshTokens.push(refreshToken);
        await user.save();

        res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                profilePhoto: user.profilePhoto
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Refresh Token
// @route   POST /api/auth/refresh-token
// @access  Public
exports.refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ success: false, message: 'No refresh token provided' });

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        // Find user with this token
        const user = await User.findOne({ _id: decoded.id, refreshTokens: token });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token' });
        }

        const accessToken = generateAccessToken(user._id);

        res.status(200).json({
            success: true,
            accessToken,
        });
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: 'Token expired or invalid' });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private (usually requires access token, but we allow simple clear)
exports.logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (refreshToken) {
        try {
            // Remove token from array
            await User.updateOne(
                { refreshTokens: refreshToken },
                { $pull: { refreshTokens: refreshToken } }
            );
        } catch (e) {
            console.log(e);
        }
    }

    res.status(200).json({ success: true, message: 'User logged out' });
};
