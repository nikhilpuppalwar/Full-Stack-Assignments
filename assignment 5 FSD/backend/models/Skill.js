// backend/models/Skill.js
// Mongoose schema for skills with category, name, and proficiency level

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Skill category is required'],
        trim: true,
        // e.g., "Programming Languages", "Android Development", "Backend & Cloud"
    },
    name: {
        type: String,
        required: [true, 'Skill name is required'],
        trim: true
    },
    level: {
        type: Number,
        required: [true, 'Skill level is required'],
        min: [0, 'Level cannot be less than 0'],
        max: [100, 'Level cannot exceed 100']
        // Stored as percentage (e.g., 90 = 90%)
    }
});

module.exports = mongoose.model('Skill', skillSchema);
