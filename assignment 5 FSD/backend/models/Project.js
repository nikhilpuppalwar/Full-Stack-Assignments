// backend/models/Project.js
// Mongoose schema for portfolio projects

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Project description is required'],
        trim: true
    },
    techStack: {
        type: [String],   // Array of technology strings
        required: [true, 'Tech stack is required']
    },
    githubLink: {
        type: String,
        default: 'https://github.com/nikhilpuppalwar'
    },
    gradient: {
        type: String,
        default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    imageUrl: {
        type: String,
        default: ''  // Path to a real project screenshot (e.g., /project_image/WhatsAppClone.jpeg)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
