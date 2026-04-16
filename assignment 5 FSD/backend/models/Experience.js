// backend/models/Experience.js
// Mongoose schema for work experience / internships

const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
        trim: true
        // e.g., "Aug 2025 - Nov 2025"
    },
    description: {
        type: [String],   // Array of bullet-point strings
        required: [true, 'Description is required']
    },
    order: {
        type: Number,
        default: 0   // Controls display order (lower = shown first)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Experience', experienceSchema);
