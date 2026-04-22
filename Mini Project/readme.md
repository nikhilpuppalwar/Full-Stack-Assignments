MessConnect - Complete Implementation README
Show Image
Show Image
Show Image
Show Image

A comprehensive MERN stack platform connecting college students with local mess (food service) providers through real-time menu updates, QR-based attendance, and subscription management.


📋 Table of Contents

Project Overview
Features
Tech Stack
System Requirements
Installation Guide
Configuration
Project Structure
Database Setup
Running the Application
API Documentation
Testing
Deployment
Environment Variables
Troubleshooting
Contributing
License


🎯 Project Overview
MessConnect is a three-sided marketplace platform that revolutionizes how college students discover and manage their daily meal subscriptions. The platform provides:

For Students: Browse verified messes, view real-time menus, subscribe to meal plans, and track attendance via QR codes
For Mess Owners: Manage daily menus, track subscribers, handle QR-based attendance, and monitor revenue
For Admins: Verify mess applications, manage users, resolve disputes, and monitor platform health

Key Highlights
✅ 23 fully functional screens across 3 user roles
✅ Complete authentication system (Email OTP + OAuth)
✅ Real-time menu management
✅ QR code-based attendance tracking
✅ Integrated payment system
✅ Review and rating system
✅ Admin verification workflow
✅ Responsive design (mobile & desktop)

✨ Features
Student Features (9 Screens)

🔐 Secure authentication (Email, Google, Facebook)
🔍 Browse and search messes with filters
📋 View real-time daily menus
💳 Subscribe to meal plans with online payment
📱 QR code generation for attendance
📊 Track subscription and attendance history
⭐ Write reviews and rate messes
💰 View payment history and invoices
👤 Manage profile and preferences

Mess Owner Features (7 Screens)

📊 Business dashboard with key metrics
🍽️ Daily menu management (Breakfast, Lunch, Dinner)
👥 Subscriber list and management
📱 QR code scanner for attendance marking
💵 Revenue analytics and settlement tracking
💬 Review management with response capability
📄 Document upload for verification (FSSAI, PAN, Bank details)

Admin Features (7 Screens)

📈 Platform analytics dashboard
👤 User management (suspend, activate, delete)
✅ Mess verification and approval workflow
💰 Financial overview and settlements
🎫 Support ticket management
📊 Advanced analytics and reporting
⚙️ System settings and configuration

Common Features

🏠 Marketing landing page
🔑 3-step signup process
📧 Email OTP verification (demo mode available)
🔒 Secure password management
📱 Fully responsive design


🛠️ Tech Stack
Frontend
├── React.js 18.x          - UI framework
├── React Router DOM 6.x   - Client-side routing
├── Axios                  - HTTP client
├── Formik + Yup          - Form handling & validation
├── React Toastify        - Notifications
├── React Icons           - Icon library
├── html5-qrcode         - QR code scanning
└── CSS3                  - Styling
Backend
├── Node.js 18.x          - Runtime environment
├── Express.js 4.x        - Web framework
├── MongoDB 6.x           - NoSQL database
├── Mongoose 8.x          - ODM
├── JWT                   - Authentication
├── bcryptjs              - Password hashing
├── NodeMailer            - Email service
├── Multer                - File uploads
├── Passport.js           - OAuth
├── express-validator     - Input validation
└── qrcode                - QR code generation
DevOps & Tools
├── Git                   - Version control
├── Nodemon               - Development server
├── Postman               - API testing
├── MongoDB Atlas         - Cloud database (optional)
└── VS Code               - Code editor

💻 System Requirements
Minimum Requirements

| Component | Requirement |
| :--- | :--- |
| Node.js | v18.0.0 or higher |
| npm | v9.0.0 or higher |
| MongoDB | v6.0 or higher |
| RAM | 4 GB minimum (8 GB recommended) |
| Disk Space | 2 GB free space |
| Operating System | Windows 10+, macOS 10.15+, Ubuntu 20.04+ |

Recommended Tools

Code Editor: VS Code
API Testing: Postman
Git: Latest version
Browser: Chrome 90+ or Firefox 88+


📥 Installation Guide
Step 1: Clone the Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/messconnect.git

# Navigate to project directory
cd messconnect
Step 2: Install MongoDB
Option A: Local MongoDB
Windows:
# Download from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
mongod --version
macOS:
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
Linux (Ubuntu):
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
Option B: MongoDB Atlas (Cloud)

```
Go to https://www.mongodb.com/cloud/atlas
Create a free account
Create a new cluster
Get your connection string
Update .env file with connection string

Step 3: Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
nano .env  # or use any text editor
Step 4: Frontend Setup
# Navigate to frontend directory (from project root)
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file
nano .env
Step 5: Create Uploads Directory
# Create uploads directory for file storage (from backend folder)
cd ../backend
mkdir -p uploads/documents

```
⚙️ Configuration
Backend Configuration (.env)
Create backend/.env file with the following:
```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/messconnect
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/messconnect

# JWT Secrets (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long_change_in_production
JWT_REFRESH_SECRET=your_refresh_token_secret_different_from_access_key_change_in_production
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password_16_characters
FROM_EMAIL=noreply@messconnect.com
FROM_NAME=MessConnect

# OTP Configuration
OTP_MODE=demo
# Options: demo (fixed OTP 123456), email (real OTP via email), both (try email, fallback to demo)
DEMO_OTP=123456

# OAuth - Google
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# OAuth - Facebook
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/auth/facebook/callback

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
OTP_RATE_LIMIT_WINDOW_MS=60000
OTP_RATE_LIMIT_MAX_REQUESTS=3
Frontend Configuration (.env)
Create frontend/.env file with:
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### **Gmail App Password Setup (For Email OTP)**

```
1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification**
4. Go to **App passwords**
5. Generate a new app password for "Mail"
6. Copy the 16-character password
7. Paste it in `.env` as `EMAIL_PASSWORD`

---

## 📂 **Project Structure**
```
messconnect/
│
├── backend/                      # Backend Node.js application
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   ├── passport.js          # OAuth configuration
│   │   └── config.js            # Environment variables
│   │
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── userController.js    # User management
│   │   ├── messController.js    # Mess operations
│   │   ├── subscriptionController.js
│   │   ├── reviewController.js
│   │   ├── owner/
│   │   │   ├── dashboardController.js
│   │   │   ├── menuController.js
│   │   │   ├── subscriberController.js
│   │   │   ├── qrController.js
│   │   │   ├── reviewManagementController.js
│   │   │   └── documentController.js
│   │   └── admin/
│   │       ├── dashboardController.js
│   │       ├── userManagementController.js
│   │       └── messVerificationController.js
│   │
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── OTP.js               # OTP schema
│   │   ├── Mess.js              # Mess schema
│   │   ├── Subscription.js      # Subscription schema
│   │   ├── Review.js            # Review schema
│   │   └── Transaction.js       # Transaction schema
│   │
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints
│   │   ├── users.js             # User endpoints
│   │   ├── mess.js              # Mess endpoints
│   │   ├── subscription.js      # Subscription endpoints
│   │   ├── review.js            # Review endpoints
│   │   ├── owner.js             # Owner endpoints
│   │   └── admin.js             # Admin endpoints
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   ├── validationMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── utils/
│   │   ├── emailService.js      # Email templates & sending
│   │   ├── generateToken.js     # JWT token generation
│   │   └── validators.js        # Validation schemas
│   │
│   ├── uploads/                 # File uploads directory
│   │   └── documents/
│   │
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   ├── .gitignore
│   ├── server.js                # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/                    # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupStep1.jsx
│   │   │   │   ├── SignupStep2.jsx
│   │   │   │   ├── SignupStep3.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── landing/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── Features.jsx
│   │   │   │   ├── HowItWorks.jsx
│   │   │   │   └── FeaturedMesses.jsx
│   │   │   └── common/
│   │   │       ├── Navbar.jsx
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       └── ProgressStepper.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── student/
│   │   │   │   ├── StudentDashboard.jsx
│   │   │   │   ├── ExploreMesses.jsx
│   │   │   │   ├── MessDetail.jsx
│   │   │   │   ├── SubscriptionPurchase.jsx
│   │   │   │   ├── MySubscriptions.jsx
│   │   │   │   ├── QRCode.jsx
│   │   │   │   ├── PaymentHistory.jsx
│   │   │   │   ├── WriteReview.jsx
│   │   │   │   └── ProfileSettings.jsx
│   │   │   ├── owner/
│   │   │   │   ├── OwnerDashboard.jsx
│   │   │   │   ├── MenuManagement.jsx
│   │   │   │   ├── SubscriberManagement.jsx
│   │   │   │   ├── QRScanner.jsx
│   │   │   │   ├── RevenueAnalytics.jsx
│   │   │   │   ├── ReviewManagement.jsx
│   │   │   │   └── DocumentUpload.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── UserManagement.jsx
│   │   │       ├── MessVerification.jsx
│   │   │       ├── FinancialOverview.jsx
│   │   │       ├── SupportTickets.jsx
│   │   │       ├── Analytics.jsx
│   │   │       └── SystemSettings.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js           # API calls
│   │   │
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   └── constants.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── docs/                        # Documentation
│   ├── API.md                   # API documentation
│   ├── DATABASE.md              # Database schema
│   └── DEPLOYMENT.md            # Deployment guide
│
├── .gitignore
├── README.md                    # This file
└── LICENSE

🗄️ Database Setup
Collections Created Automatically
The application will create the following MongoDB collections:

users - User accounts (students, owners, admins)
messes - Mess listings
subscriptions - Student subscriptions
otps - Email OTP codes (TTL indexed, auto-expires)
reviews - Student reviews
transactions - Payment transactions

Database Indexes
The application automatically creates indexes for:

User email (unique)
User phone (unique)
Mess location and rating
Subscription dates
Review dates

Seed Data (Optional)
To populate the database with sample data:
```bash
cd backend
node seeds/seedData.js
```

```
This will create:
- 2 test students
- 2 test mess owners
- 1 admin account
- Sample messes
- Sample subscriptions

**Test Credentials:**
```
Student:
Email: student@test.com
Password: Test@1234

Owner:
Email: owner@test.com
Password: Test@1234

Admin:
Email: admin@messconnect.com
Password: Admin@1234

🚀 Running the Application
Development Mode
Option 1: Run Backend and Frontend Separately
Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
Terminal 2 - Frontend:
cd frontend
npm start
# App opens on http://localhost:3000
Option 2: Run Both Concurrently (from project root)
# Install concurrently (if not already)
npm install -g concurrently

# Run both
concurrently "cd backend && npm run dev" "cd frontend && npm start"
Production Mode
# Backend
cd backend
npm start

# Frontend (build and serve)
cd frontend
npm run build
# Serve build folder with a static server
npx serve -s build -l 3000
Verify Installation

```
Backend Health Check:

bash   curl http://localhost:5000/api/health
   # Should return: {"success":true,"message":"MessConnect API is running"}

Frontend:

Open browser: http://localhost:3000
You should see the landing page


Database:

bash   mongosh
   > use messconnect
   > db.stats()
   # Should show database statistics
```

---

## 📚 **API Documentation**

### **Base URL**
```
Development: http://localhost:5000/api
Production: https://api.messconnect.com/api
Authentication
All protected routes require JWT token in header:
```http
Authorization: Bearer <access_token>
Key Endpoints
Authentication
POST   /auth/signup/step1           # Save personal details
POST   /auth/signup/step2           # Save role selection
POST   /auth/send-otp               # Send OTP
POST   /auth/verify-otp             # Verify OTP & create account
POST   /auth/login                  # Login
POST   /auth/refresh-token          # Refresh access token
POST   /auth/logout                 # Logout
Messes (Public)
GET    /messes                      # Get all messes
GET    /messes/:id                  # Get mess details
GET    /messes/:id/menu             # Get mess menu
Subscriptions (Student)
POST   /subscriptions               # Create subscription
GET    /subscriptions/my-subscriptions  # Get user subscriptions
POST   /subscriptions/:id/cancel    # Cancel subscription
Owner
GET    /owner/dashboard             # Dashboard stats
POST   /owner/menu                  # Update menu
GET    /owner/subscribers           # Get subscribers
POST   /owner/qr/verify             # Verify QR code
POST   /owner/qr/mark-attendance    # Mark attendance
Admin
GET    /admin/dashboard             # Platform stats
GET    /admin/users                 # Get all users
GET    /admin/verifications/pending # Pending verifications
POST   /admin/verifications/:id/approve  # Approve mess
Complete API Documentation
For detailed API documentation, see:

```
API Documentation
Postman Collection


🧪 Testing
Manual Testing
1. Test Student Signup Flow
```bash
# Step 1: Sign up
curl -X POST http://localhost:5000/api/auth/signup/step1 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@test.com",
    "phone": "9876543210",
    "password": "Test@1234"
  }'

# Step 2: Select role
curl -X POST http://localhost:5000/api/auth/signup/step2 \
  -H "Content-Type: application/json" \
  -H "Cookie: <session_cookie>" \
  -d '{"role": "student"}'

# Step 3: Send OTP (check console for demo OTP: 123456)
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "userName": "John Doe"
  }'

# Step 4: Verify OTP
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -H "Cookie: <session_cookie>" \
  -d '{
    "email": "john@test.com",
    "otp": "123456"
  }'
2. Test Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrPhone": "john@test.com",
    "password": "Test@1234",
    "rememberMe": true
  }'
Using Postman

```
Import collection: postman/MessConnect.postman_collection.json
Set environment variables:

base_url: http://localhost:5000/api
access_token: (will be set automatically after login)


Run collection tests

Automated Testing (Future)
```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test

```
🌐 Deployment
Deployment Options
Option 1: Traditional Server (VPS)
Requirements:

Ubuntu 20.04+ server
Node.js 18+
MongoDB 6+
Nginx (reverse proxy)
PM2 (process manager)

Steps:

Setup Server:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB (see installation guide above)

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2

```
Deploy Application:

```bash
# Clone repository
git clone https://github.com/yourusername/messconnect.git
cd messconnect

# Backend setup
cd backend
npm install --production
cp .env.example .env
# Edit .env with production values

# Start with PM2
pm2 start server.js --name messconnect-backend
pm2 save
pm2 startup

# Frontend build
cd ../frontend
npm install
npm run build

# Copy build to Nginx directory
sudo cp -r build/* /var/www/messconnect/

```
Configure Nginx:

Create /etc/nginx/sites-available/messconnect:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /var/www/messconnect;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads
    location /uploads {
        alias /path/to/messconnect/backend/uploads;
    }
}
Enable site:
sudo ln -s /etc/nginx/sites-available/messconnect /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

```
SSL Certificate (Let's Encrypt):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
Option 2: Cloud Platforms
Heroku:
# Install Heroku CLI
# Backend deployment
cd backend
heroku create messconnect-api
heroku addons:create mongolab
heroku config:set NODE_ENV=production
git push heroku main

# Frontend deployment
cd ../frontend
# Add build pack for create-react-app
heroku create messconnect-app
heroku buildpacks:set mars/create-react-app
git push heroku main
Vercel (Frontend):
npm install -g vercel
cd frontend
vercel --prod
Railway (Backend):
# Install Railway CLI
npm install -g @railway/cli
cd backend
railway login
railway init
railway up
AWS EC2 + MongoDB Atlas:

```
Launch EC2 instance (Ubuntu)
Follow VPS deployment steps
Use MongoDB Atlas connection string
Configure security groups for ports 80, 443, 5000


🔐 Environment Variables
Critical Variables to Change in Production

| Variable | Development | Production |
| :--- | :--- | :--- |
| NODE_ENV | development | production |
| JWT_SECRET | Change this | Strong random 64-char string |
| JWT_REFRESH_SECRET | Change this | Different strong random string |
| MONGODB_URI | localhost | MongoDB Atlas or production DB |
| FRONTEND_URL | localhost:3000 | Your domain |
| CORS_ORIGIN | localhost:3000 | Your domain |
| EMAIL_PASSWORD | Gmail app password | Production email credentials |
| OTP_MODE | demo | email or both |

Generate Secure Secrets
```bash
# Generate JWT secret (Node.js)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use online generator
# https://www.random.org/strings/

```
🐛 Troubleshooting
Common Issues
1. MongoDB Connection Error
Error: MongoNetworkError: failed to connect to server
Solutions:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Verify connection string in .env
# For local: mongodb://localhost:27017/messconnect
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/messconnect
2. Port Already in Use
Error: EADDRINUSE: address already in use :::5000
Solutions:
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in .env
PORT=5001
3. CORS Errors
Error: Access to XMLHttpRequest blocked by CORS policy
Solutions:

```
Verify CORS_ORIGIN in backend .env matches frontend URL
Check FRONTEND_URL is correct
Restart backend server after changing .env

4. Email OTP Not Sending
Error: Failed to send OTP email
Solutions:

Verify Gmail App Password (16 characters, no spaces)
Check 2-Step Verification is enabled
Use demo mode for development: OTP_MODE=demo
Check email credentials in .env:

env  EMAIL_USER=your.email@gmail.com
  EMAIL_PASSWORD=your_app_password
5. JWT Token Expired
Error: jwt expired
Solutions:

This is normal after 15 minutes
Frontend should automatically refresh token
Check refresh token flow in api.js
Login again if refresh token also expired

6. File Upload Fails
Error: ENOENT: no such file or directory, open 'uploads/documents/...'
Solutions:
```bash
# Create uploads directory
cd backend
mkdir -p uploads/documents

# Check permissions
chmod 755 uploads
7. Build Errors (Frontend)
Error: Module not found: Can't resolve ...
Solutions:
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

# Clear create-react-app cache
rm -rf node_modules/.cache
```

#### **8. QR Scanner Not Working**

```
**Error:** `Camera permission denied`

**Solutions:**
- Allow camera access in browser settings
- Use HTTPS (camera requires secure context)
- For development, localhost is treated as secure

---

## 🤝 **Contributing**

We welcome contributions! Please follow these guidelines:

### **Getting Started**

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/messconnect.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make changes and commit: `git commit -m "Add: your feature description"`
5. Push to your fork: `git push origin feature/your-feature-name`
6. Create a Pull Request

### **Coding Standards**

- Use ES6+ JavaScript
- Follow existing code style
- Add comments for complex logic
- Write meaningful commit messages
- Test before submitting PR

### **Commit Message Format**
```
Type: Brief description

Detailed description (optional)

Types: Add, Update, Fix, Remove, Refactor, Docs, Test
```

**Examples:**
```
Add: Student dashboard component
Fix: OTP verification bug
Update: Improve error handling in auth controller
Docs: Add API documentation for subscriptions
```

---

## 📄 **License**

This project is licensed under the **MIT License**.
```
MIT License

Copyright (c) 2026 MessConnect

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

📞 Support & Contact
Getting Help

📧 Email: support@messconnect.com
💬 Discord: Join our community
🐛 Issues: GitHub Issues
📖 Docs: Documentation

Reporting Bugs
Please include:

Description of the bug
Steps to reproduce
Expected behavior
Actual behavior
Screenshots (if applicable)
Environment details (OS, Node version, etc.)

Feature Requests
Open an issue with the enhancement label and describe:

The feature
Use case
Expected outcome


🎉 Acknowledgments

React.js community
Node.js community
MongoDB team
All open-source contributors


📊 Project Status
Current Version: v1.0.0
Completed Features

✅ Authentication system (Email OTP + OAuth)
✅ Student features (9 screens)
✅ Owner features (7 screens)
✅ Admin features (7 screens)
✅ QR-based attendance
✅ Payment integration structure
✅ Review system
✅ Responsive design

Upcoming Features

📱 Mobile app (React Native)
🔔 Push notifications
💬 In-app chat
🎁 Referral program
📊 Advanced analytics
🤖 AI-powered recommendations


🚀 Quick Start Summary
```bash
# 1. Clone repository
git clone https://github.com/yourusername/messconnect.git
cd messconnect

# 2. Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env file
npm run dev

# 3. Frontend setup (in new terminal)
cd ../frontend
npm install
cp .env.example .env
npm start

# 4. Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Health Check: http://localhost:5000/api/health

# 5. Test with demo OTP: 123456

```
📈 Performance Tips

Use MongoDB Atlas for production (better performance)
Enable caching (Redis) for frequently accessed data
Use CDN for static assets
Implement lazy loading for React components
Optimize images before uploading
Enable gzip compression in production
Use PM2 cluster mode for better concurrency


🔒 Security Best Practices

✅ Never commit .env files
✅ Change default JWT secrets in production
✅ Use HTTPS in production
✅ Implement rate limiting
✅ Validate all inputs server-side
✅ Sanitize user inputs
✅ Keep dependencies updated
✅ Regular security audits
✅ Monitor logs for suspicious activity
✅ Use strong passwords


🎓 Learning Resources
MERN Stack

React Documentation
Node.js Documentation
MongoDB University
Express.js Guide

Authentication

JWT.io
OAuth 2.0
Passport.js Documentation

Best Practices

Node.js Best Practices
React Best Practices


🌟 Star the Repository
If you find this project helpful, please ⭐ star the repository!

📝 Changelog
v1.0.0 (February 2026)

Initial release
23 screens implemented
Complete authentication system
QR-based attendance
Document verification workflow
Review and rating system


Built with ❤️ by the MessConnect Team

Last Updated: February 26, 2026
Repository: https://github.com/yourusername/messconnect
Website: https://messconnect.com