// backend/routes/experience.js
// REST API routes for Work Experience

const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// ---------------------------------------------------------
// GET /experience  →  Retrieve all experience entries
// ---------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        // Sort by order field so display is predictable
        const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            count: experiences.length,
            data: experiences
        });

    } catch (error) {
        console.error('Error fetching experience:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching experience.',
            error: error.message
        });
    }
});

// ---------------------------------------------------------
// POST /experience  →  Add a new experience entry (seeding)
// ---------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const { role, company, duration, description, order } = req.body;

        if (!role || !company || !duration || !description) {
            return res.status(400).json({
                success: false,
                message: 'Role, company, duration, and description are required.'
            });
        }

        const newExp = new Experience({ role, company, duration, description, order });
        await newExp.save();

        res.status(201).json({
            success: true,
            message: 'Experience added successfully.',
            data: newExp
        });

    } catch (error) {
        console.error('Error adding experience:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while adding experience.',
            error: error.message
        });
    }
});

module.exports = router;
