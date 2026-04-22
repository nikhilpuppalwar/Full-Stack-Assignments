const jwt = require('jsonwebtoken');

// Generate Access Token (expires in 15m)
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });
};

// Generate Refresh Token (expires in 7d or 30d if 'Remember Me')
const generateRefreshToken = (id, rememberMe) => {
    const expiresIn = rememberMe ? '30d' : (process.env.JWT_REFRESH_EXPIRES_IN || '7d');
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn,
    });
};

module.exports = { generateAccessToken, generateRefreshToken };
