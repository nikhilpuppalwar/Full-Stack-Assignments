const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        phone: {
            type: String,
            required: [true, 'Please add a phone number'],
            unique: true,
            match: [/^[6-9]\d{9}$/, 'Please use a valid 10-digit Indian phone number'],
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 8,
            select: false,
        },
        role: {
            type: String,
            enum: ['student', 'owner', 'admin'],
            default: 'student',
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        // Owner specific
        ownerVerificationDocuments: {
            fssai: String,
            pan: String,
            bankDetails: String,
        },
        // Student specific
        studentVerification: {
            idCard: String,
            collegeName: String,
            studentIdNumber: String,
            status: {
                type: String,
                enum: ['Pending', 'Approved', 'Rejected'],
                default: 'Pending',
            }
        },
        preferences: {
            dietary: { type: String, enum: ['Veg', 'Non-veg', 'Jain'], default: 'Veg' },
        },
        // Social / Auth
        googleId: String,
        facebookId: String,
        refreshTokens: [String],
        profilePhoto: String,
    },
    { timestamps: true }
);

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
