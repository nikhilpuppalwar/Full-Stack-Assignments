// backend/routes/skills.js
// REST API routes for Skills

const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// ---------------------------------------------------------
// GET /skills  →  Retrieve all skills from MongoDB
// ---------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        // Get all skills, grouped by category order
        const skills = await Skill.find().sort({ category: 1, level: -1 });

        res.status(200).json({
            success: true,
            count: skills.length,
            data: skills
        });

    } catch (error) {
        console.error('Error fetching skills:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching skills.',
            error: error.message
        });
    }
});

// ---------------------------------------------------------
// POST /skills  →  Add a new skill (for seeding/admin)
// ---------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const { category, name, level } = req.body;

        if (!category || !name || level === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Category, name, and level are required.'
            });
        }

        const newSkill = new Skill({ category, name, level });
        await newSkill.save();

        res.status(201).json({
            success: true,
            message: 'Skill added successfully.',
            data: newSkill
        });

    } catch (error) {
        console.error('Error adding skill:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while adding skill.',
            error: error.message
        });
    }
});

module.exports = router;
