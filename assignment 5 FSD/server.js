// server.js — Main Express Application Entry Point
// Full-Stack Portfolio: Node.js + Express + MongoDB
// ===================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// --- Import Route Files ---
const contactRoutes   = require('./backend/routes/contact');
const projectRoutes   = require('./backend/routes/projects');
const skillRoutes     = require('./backend/routes/skills');
const experienceRoutes = require('./backend/routes/experience');

// --- Initialize Express ---
const app = express();
const PORT = process.env.PORT || 5000;

// ===================================================
// MIDDLEWARE
// ===================================================

// Enable Cross-Origin Resource Sharing (allows frontend to call backend)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the /frontend folder
// This makes index.html, styles.css, script.js, etc. available
app.use(express.static(path.join(__dirname, 'frontend')));

// ===================================================
// MONGODB CONNECTION
// ===================================================

// MongoDB connection string — change "portfolioDB" to your database name if needed
const MONGO_URI = 'mongodb://127.0.0.1:27017/portfolioDB';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully!');
        // Seed default data when first connected (only if collections are empty)
        seedDatabase();
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.message);
        console.log('⚠️  Make sure MongoDB is running on your machine.');
        process.exit(1); // Stop server if DB connection fails
    });

// ===================================================
// API ROUTES
// ===================================================

// Contact form routes  →  POST /contact  |  GET /messages  |  DELETE /messages/:id
app.use('/contact', contactRoutes);

// Projects routes      →  GET /projects  |  POST /projects
app.use('/projects', projectRoutes);

// Skills routes        →  GET /skills    |  POST /skills
app.use('/skills', skillRoutes);

// Experience routes    →  GET /experience | POST /experience
app.use('/experience', experienceRoutes);

// ===================================================
// ADMIN SECRET CODE VERIFICATION
// POST /verify-admin  →  { code } in body
// Returns { success: true } if code matches, 401 otherwise
// ===================================================

const ADMIN_SECRET_CODE = 'nikhil@admin2026'; // ← Change this secret code

app.post('/verify-admin', (req, res) => {
    const { code } = req.body;
    if (code === ADMIN_SECRET_CODE) {
        return res.status(200).json({
            success: true,
            message: 'Access granted.',
            token: Buffer.from(`admin:${Date.now()}`).toString('base64') // Simple session token
        });
    }
    return res.status(401).json({
        success: false,
        message: 'Invalid secret code. Access denied.'
    });
});

// ===================================================
// FRONTEND ROUTES
// ===================================================

// Serve main portfolio page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Serve admin login gate (secret code entry)
app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin-login.html'));
});

// Serve admin panel page (protected by client-side session check)
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'admin.html'));
});

// ===================================================
// 404 HANDLER (catch-all for unknown routes)
// ===================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found.`
    });
});

// ===================================================
// GLOBAL ERROR HANDLER
// ===================================================

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'An unexpected error occurred.',
        error: err.message
    });
});

// ===================================================
// START SERVER
// ===================================================

app.listen(PORT, () => {
    console.log('===========================================');
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
    console.log(`📂 Portfolio:         http://localhost:${PORT}/`);
    console.log(`🔧 Admin Panel:       http://localhost:${PORT}/admin`);
    console.log('===========================================');
});

// ===================================================
// DATABASE SEEDING — Populate initial data on first run
// ===================================================

async function seedDatabase() {
    // We import models here to avoid issues before DB connects
    const Project    = require('./backend/models/Project');
    const Skill      = require('./backend/models/Skill');
    const Experience = require('./backend/models/Experience');

    // ---- SEED PROJECTS ----
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
        console.log('🌱 Seeding projects...');
        await Project.insertMany([
            {
                title: 'WhatsApp Clone',
                description: 'Built a real-time chat application with OTP-based phone authentication using Firebase Authentication, implemented real-time messaging with Firebase Realtime Database, and designed chat, profile, status, and call user interfaces using Jetpack Compose.',
                techStack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'MVVM', 'Hilt'],
                githubLink: 'https://github.com/nikhilpuppalwar/WhatsApp.git',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                imageUrl: '/project_image/WhatsAppClone.jpeg'
            },
            {
                title: 'Agri Mart App',
                description: 'Developed a real-time agricultural marketplace Android application with secure authentication, multi-image uploads, and dynamic product listings, ensuring live data synchronization and optimized UI performance.',
                techStack: ['Kotlin', 'Firebase Realtime DB', 'Android'],
                githubLink: 'https://github.com/nikhilpuppalwar/Agro-Product-and-Listing.git',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                imageUrl: '/project_image/AgroMart.jpg'
            },
            {
                title: 'Laundry Mart App',
                description: 'Created a laundry management Android application with login and signup functionality, enhancing user experience through animations and improved UI design.',
                techStack: ['Kotlin', 'XML', 'Firebase'],
                githubLink: 'https://github.com/nikhilpuppalwar/Laundry-Mart-App.git',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                imageUrl: '/project_image/LaundryMart.jpg'
            },
            {
                title: 'SmartQuizzer',
                description: 'An adaptive AI-based quiz generator developed during Infosys Springboard Internship. Applied AI-driven logic to enhance personalized learning experiences.',
                techStack: ['AI/ML', 'Python', 'Adaptive Learning'],
                githubLink: 'https://github.com/nikhilpuppalwar/SmartQuizzer_new.git',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                imageUrl: '/project_image/SmartQuizzer.png'
            }
        ]);
        console.log('✅ Projects seeded!');
    }

    // ---- SEED SKILLS ----
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
        console.log('🌱 Seeding skills...');
        await Skill.insertMany([
            // Programming Languages
            { category: 'Programming Languages', name: 'Kotlin',  level: 90 },
            { category: 'Programming Languages', name: 'Java',    level: 85 },
            { category: 'Programming Languages', name: 'Python',  level: 80 },
            { category: 'Programming Languages', name: 'C++',     level: 75 },
            { category: 'Programming Languages', name: 'SQL',     level: 80 },
            // Android Development
            { category: 'Android Development', name: 'Jetpack Compose', level: 90 },
            { category: 'Android Development', name: 'XML',              level: 85 },
            { category: 'Android Development', name: 'Android Studio',   level: 90 },
            { category: 'Android Development', name: 'MVVM Architecture', level: 85 },
            // Backend & Cloud
            { category: 'Backend & Cloud', name: 'Firebase Authentication', level: 85 },
            { category: 'Backend & Cloud', name: 'Firebase Realtime DB',    level: 85 },
            { category: 'Backend & Cloud', name: 'REST APIs',               level: 80 },
            // Tools & Others
            { category: 'Tools & Others', name: 'Git & GitHub',  level: 85 },
            { category: 'Tools & Others', name: 'Postman',       level: 75 },
            { category: 'Tools & Others', name: 'DSA & OOPs',    level: 80 },
            { category: 'Tools & Others', name: 'Data Analysis', level: 70 }
        ]);
        console.log('✅ Skills seeded!');
    }

    // ---- SEED EXPERIENCE ----
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
        console.log('🌱 Seeding experience...');
        await Experience.insertMany([
            {
                role: 'Android Development Intern',
                company: 'SpaceECE, Pune',
                duration: 'Aug 2025 - Nov 2025',
                description: [
                    'Worked on the Android Milestone Tracker project',
                    'Developed Android features using Kotlin and Firebase',
                    'Collaborated in an agile environment and delivered assigned modules successfully'
                ],
                order: 1
            },
            {
                role: 'Infosys Springboard Internship 6.0 (B3)',
                company: 'Infosys',
                duration: 'Sep 2025 - Nov 2025',
                description: [
                    'Developed SmartQuizzer, an adaptive AI-based quiz generator',
                    'Applied AI-driven logic to enhance personalized learning experiences'
                ],
                order: 2
            }
        ]);
        console.log('✅ Experience seeded!');
    }
}
