// backend/routes/contact.js
// REST API routes for Contact form messages

const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// ---------------------------------------------------------
// POST /contact  →  Save a new contact message to MongoDB
// ---------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and message.'
            });
        }

        // Create and save the new contact entry
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! I will get back to you soon.',
            data: newContact
        });

    } catch (error) {
        console.error('Error saving contact:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
});

// ---------------------------------------------------------
// GET /messages  →  Retrieve all contact messages (Admin)
// ---------------------------------------------------------
router.get('/messages', async (req, res) => {
    try {
        // Fetch all messages, newest first
        const messages = await Contact.find().sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {
        console.error('Error fetching messages:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching messages.',
            error: error.message
        });
    }
});

// ---------------------------------------------------------
// DELETE /messages/:id  →  Delete a specific message (Admin)
// ---------------------------------------------------------
router.delete('/messages/:id', async (req, res) => {
    try {
        const deleted = await Contact.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Message not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully.'
        });

    } catch (error) {
        console.error('Error deleting message:', error.message);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting message.',
            error: error.message
        });
    }
});

module.exports = router;
