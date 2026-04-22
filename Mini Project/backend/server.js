const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 900000), // 15 minutes by default
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100), // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files from uploads
app.use('/uploads', express.static('uploads'));

// Basic Route
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'MessConnect API is running' });
});

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const messRoutes = require('./routes/mess');
const subscriptionRoutes = require('./routes/subscriptions');
const reviewRoutes = require('./routes/reviews');
const ownerRoutes = require('./routes/owner');
const adminRoutes = require('./routes/admin');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messes', messRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/reviews', reviewRoutes); // Note: Nested routing /api/messes/:messId/reviews is technically preferred if tight coupling needed, we can support both.
app.use('/api/owner', ownerRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
