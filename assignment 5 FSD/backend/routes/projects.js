// backend/routes/projects.js
// REST API routes for Portfolio Projects

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// ---------------------------------------------------------
// GET /projects  →  Retrieve all projects from MongoDB
// ---------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });

    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching projects.',
            error: error.message
        });
    }
});

// ---------------------------------------------------------
// POST /projects  →  Add a new project (for seeding/admin)
// ---------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const { title, description, techStack, githubLink, gradient, imageUrl } = req.body;

        if (!title || !description || !techStack) {
            return res.status(400).json({
                success: false,
                message: 'Title, description, and techStack are required.'
            });
        }

        const newProject = new Project({ title, description, techStack, githubLink, gradient, imageUrl });
        await newProject.save();

        res.status(201).json({
            success: true,
            message: 'Project added successfully.',
            data: newProject
        });

    } catch (error) {
        console.error('Error adding project:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while adding project.',
            error: error.message
        });
    }
});

// ---------------------------------------------------------
// PUT /projects/:id  →  Update an existing project
// ---------------------------------------------------------
router.put('/:id', async (req, res) => {
    try {
        const { title, description, techStack, githubLink, gradient, imageUrl } = req.body;

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, techStack, githubLink, gradient, imageUrl },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Project updated successfully.',
            data: updatedProject
        });
    } catch (error) {
        console.error('Error updating project:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while updating project.',
            error: error.message
        });
    }
});

// ---------------------------------------------------------
// DELETE /projects/:id  →  Delete a project
// ---------------------------------------------------------
router.delete('/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);

        if (!deletedProject) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Project deleted successfully.',
            data: {}
        });
    } catch (error) {
        console.error('Error deleting project:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting project.',
            error: error.message
        });
    }
});

module.exports = router;
