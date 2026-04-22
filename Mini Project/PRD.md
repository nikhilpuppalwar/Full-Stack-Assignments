MessConnect - Complete Product Requirements Document (PRD)

📄 Document Information

| Field | Details |
| :--- | :--- |
| Product Name | MessConnect |
| Version | 1.0 |
| Document Version | 1.0 |
| Last Updated | February 25, 2026 |
| Document Owner | Product Team |
| Status | Final |
| Confidentiality | Internal |

📑 Table of Contents

Executive Summary
Product Overview
Market Analysis
User Personas
Product Features
User Journey & Flows
Functional Requirements
Technical Specifications
Design Requirements
Security & Privacy
Performance Requirements
Analytics & Metrics
Roadmap & Phases
Success Metrics
Risks & Mitigation
Appendix

# 1. Executive Summary
## 1.1 Product Vision
MessConnect is a comprehensive digital platform that bridges the gap between college students and local mess (food service) providers. The platform enables students to discover, subscribe to, and manage their meal plans while providing mess owners with tools to efficiently manage their business operations, menus, and customer relationships.
## 1.2 Problem Statement
Current Pain Points:
For Students:

Difficulty finding reliable, hygienic mess services near college campuses
Lack of transparency in pricing and menu offerings
No way to verify mess quality before subscribing
Manual payment processes and attendance tracking
Inability to view real-time menus
Poor dispute resolution mechanisms

For Mess Owners:

Limited reach to potential customers (students)
Manual subscriber management and attendance tracking
Difficulty in managing payments and settlements
No organized platform to showcase services
Inefficient menu communication
Lack of customer feedback mechanisms

For the Market:

Fragmented, unorganized mess ecosystem
Trust deficit between students and mess providers
No standardized verification or quality assurance
Payment and refund disputes

## 1.3 Solution Overview
MessConnect provides a three-sided marketplace platform connecting:

Students - Discover, subscribe, and manage meal plans
Mess Owners - List services, manage operations, track revenue
Platform Administrators - Ensure quality, resolve disputes, maintain platform health

Core Value Propositions:
| User Type | Key Benefits |
| :--- | :--- |
| Students | - Real-time menu visibility<br>- Transparent pricing<br>- Verified, quality mess options<br>- QR-based attendance<br>- Flexible subscription plans<br>- Review-based decision making |
| Mess Owners | - Direct access to student market<br>- Digital payment processing<br>- Automated attendance tracking<br>- Business analytics dashboard<br>- Customer relationship management<br>- Verified platform credibility |
| Platform | - 5% commission on transactions<br>- Featured listing fees<br>- Premium subscription revenue<br>- Advertisement opportunities |
## 1.4 Target Market
Primary Market:

Geography: India (Tier 1 & 2 cities)
Initial Launch Cities: Pune, Mumbai, Bangalore, Delhi, Hyderabad, Chennai
Target Audience:

Students: 18-26 years, undergraduate/postgraduate
Mess Owners: Small to medium food service businesses

Market Size:

TAM (Total Addressable Market): 40 million college students in India
SAM (Serviceable Addressable Market): 15 million students in urban areas
SOM (Serviceable Obtainable Market): 500,000 students in Year 1

## 1.5 Success Criteria
Year 1 Goals:

User Acquisition: 50,000 students, 500 verified messes
Revenue: ₹5 Crore GMV, ₹25 Lakh platform revenue
Engagement: 85% subscription renewal rate
Quality: 4.5+ average mess rating

# 2. Product Overview
## 2.1 Product Description
MessConnect is a web-based MERN stack application (MongoDB, Express.js, React.js, Node.js) that provides:

Marketplace Platform - Discovery and booking of mess services
Operations Management - Tools for mess owners to manage daily operations
Quality Assurance - Admin verification and monitoring system
Payment Processing - Integrated digital payment gateway
Communication Hub - Real-time menu updates and notifications

## 2.2 Product Type

Platform: Web Application (Desktop & Mobile Responsive)
Architecture: Full-Stack SaaS Platform
Deployment: Cloud-hosted (AWS/Azure)
Access: Browser-based (Chrome, Safari, Firefox, Edge)

## 2.3 Key Differentiators

| Feature | MessConnect | Traditional Mess | Food Delivery Apps |
| :--- | :--- | :--- | :--- |
| Real-time Menu | ✅ Yes | ❌ No | ⚠️ Limited |
| Subscription Model | ✅ Yes | ⚠️ Manual | ❌ No |
| QR Attendance | ✅ Yes | ❌ No | N/A |
| Verified Messes | ✅ FSSAI Verified | ⚠️ Varies | ⚠️ Basic |
| Transparent Pricing | ✅ Upfront | ⚠️ Varies | ✅ Yes |
| Monthly Plans | ✅ Yes | ✅ Yes | ❌ No |
| Delivery | ❌ Dine-in only | ✅ Dine-in | ✅ Delivery |
| Cost | 💰 Low | 💰 Low | 💰💰 High |

# 3. Market Analysis
## 3.1 Market Opportunity
Industry Overview:

Market: Food Services - Student Segment
Current Size: ₹10,000 Crore (estimated)
Growth Rate: 15% CAGR
Digital Penetration: <5% (massive opportunity)

Market Trends:

Digital Adoption: 85% of students use smartphones
Cashless Preference: 70% prefer digital payments
Quality Consciousness: Growing demand for verified, hygienic food
Convenience: Students prioritize time-saving solutions
Transparency: Price and menu visibility increasingly important

## 3.2 Competitive Analysis
Direct Competitors:

Currently no direct platform competitor in India
Fragmented market with local, unorganized players

Indirect Competitors:
CompetitorTypeStrengthsWeaknessesSwiggy/ZomatoFood Delivery
-  Large user base
-  Brand recognition
-  Technology
-  High delivery costs
-  Not subscription-based
-  Restaurant focusLocal Mess OperatorsTraditional
-  Established relationships
-  Lower costs
-  No digital presence
-  Limited reach
-  Manual processesHostel CanteensInstitutional
-  Convenient location
-  Subsidized pricing
-  Limited menu variety
-  Fixed options
-  Quality concerns
Competitive Advantages:

✅ First-mover advantage in digital mess aggregation
✅ Subscription model ensuring recurring revenue
✅ Verification system building trust
✅ Technology-enabled operations for efficiency
✅ Focused niche (students + messes only)

## 3.3 Target Audience
Primary Users:
Students (82% of user base):

Demographics: 18-26 years, college students
Psychographics: Tech-savvy, budget-conscious, convenience-seeking
Behavior: Active on social media, mobile-first, peer-influenced
Pain Points: Finding affordable, quality food near campus
Motivations: Save money, eat healthy, avoid cooking

Mess Owners (18% of user base):

Demographics: 25-55 years, small business owners
Psychographics: Entrepreneurial, customer-focused, growth-oriented
Behavior: Seeking technology to scale business
Pain Points: Limited customer acquisition, manual processes
Motivations: Increase revenue, reduce operational overhead, build reputation

# 4. User Personas
## 4.1 Primary Persona: College Student
Name: Rohan Sharma
Age: 21
Education: B.Tech Computer Science, 3rd Year
Location: Pune, Maharashtra
Living: PG/Hostel
Background:

Stays away from home for college
Has a monthly budget of ₹8,000 for food
Doesn't have time to cook
Uses smartphone for most daily tasks

Goals:

Find affordable, hygienic mess near college
View daily menus before subscribing
Manage multiple meal subscriptions easily
Track food expenses

Frustrations:

Can't find trustworthy mess services
No transparency in pricing
Difficult to verify mess quality
Manual payment processes are inconvenient

Tech Proficiency: High (daily smartphone user)
Quote: "I want to focus on my studies, not worry about where my next meal is coming from."

## 4.2 Secondary Persona: Mess Owner
Name: Savita Deshpande
Age: 42
Business: Shree Ganesh Mess
Location: Near COEP, Pune
Experience: 10 years in food service
Background:

Runs a small mess serving 50-60 students
Manages operations manually with register books
Struggles with customer acquisition
Wants to expand business

Goals:

Reach more students in the area
Streamline attendance and payment tracking
Build reputation through reviews
Increase monthly subscriber count

Frustrations:

Word-of-mouth marketing is slow
Manual attendance tracking is time-consuming
Payment collection is inefficient
No way to showcase daily menus digitally

Tech Proficiency: Medium (uses WhatsApp for business)
Quote: "I cook good food, but students don't know about my mess. I need more visibility."

## 4.3 Tertiary Persona: Platform Administrator
Name: Priya Menon
Age: 28
Role: Operations Manager
Location: MessConnect HQ, Mumbai
Background:

MBA graduate with operations experience
Responsible for platform quality and growth
Manages mess verification process

Goals:

Ensure all listed messes are verified and quality
Resolve disputes efficiently
Maintain platform health and growth
Monitor key metrics

Responsibilities:

Verify mess applications
Handle support tickets
Monitor financial transactions
Generate platform analytics

Quote: "Platform trust depends on our verification quality. Every mess must meet our standards."

# 5. Product Features
## 5.1 Feature Overview
MessConnect consists of 23 screens across 3 user roles:

| User Role | Screens | Core Features |
| :--- | :--- | :--- |
| Student | 9 screens | Browse, Subscribe, Attend, Review, Manage |
| Mess Owner | 7 screens | Menu, Subscribers, QR Scanner, Revenue, Documents |
| Admin | 7 screens | Verification, Users, Analytics, Settings |
| Common | 5 screens | Landing, Login, Signup, Password Reset |

## 5.2 Feature Breakdown by User Role
📱 STUDENT FEATURES
### 5.2.1 Authentication & Onboarding
Features:

3-Step Signup Process:

Step 1: Personal Details (Name, Email, Phone, Password)
Step 2: Role Selection (Student/Owner)
Step 3: Email OTP Verification

Social Login: Google & Facebook OAuth
Password Management: Reset via email link
Session Management: "Remember Me" for 30 days

Requirements:

Email OTP must expire in 10 minutes
Password strength: Min 8 characters, uppercase, lowercase, number, symbol
Phone validation: Indian format (10 digits, starts with 6-9)
JWT tokens: Access (15 min), Refresh (7 days / 30 days)

### 5.2.2 Mess Discovery & Browsing
Features:

Search & Filters:

Search by name, location
Filter by: Type (Veg/Non-veg), Rating (4+, 4.5+), City
Sort by: Rating, Subscribers, Newest

Mess Cards Display:

Photo, Name, Location, Rating, Price range
"View Details" CTA

Pagination: 10 messes per page

Data Points:

Mess name, description, type (Pure Veg/Veg & Non-veg/Non-veg only)
Location (address, city, Google Maps link)
Photos (minimum 5)
Rating (average, count)
Current subscribers count
Available plans with pricing

### 5.2.3 Mess Detail Page
Features:

Overview Section:

Mess photos (carousel)
Name, type, rating
Location with map
Contact details

Menu Section:

Today's menu (Breakfast, Lunch, Dinner)
Date selector for future menus
Menu items displayed by meal type

Subscription Plans:

Plan name (e.g., "Lunch + Dinner")
Meals included
Duration (days)
Price
"Subscribe Now" button

Reviews Section:

Overall rating breakdown (5★, 4★, 3★, 2★, 1★)
Recent reviews (5 latest)
Filter: All, Most Helpful, Recent
Student name, rating, review text, date
Owner responses (if any)
"Mark Helpful" feature

About Section:

Description
Features (AC, WiFi, Parking, etc.)
Timings (Breakfast, Lunch, Dinner)
Seating capacity

### 5.2.4 Subscription Purchase Flow
3-Step Process:
Step 1: Plan Selection

Select plan (Lunch+Dinner, Full Day, etc.)
Select start date (today or future)
View calculated end date
See price breakdown
Terms & conditions checkbox

Step 2: Confirmation

Review selected plan details
Student information
Mess information
Total amount
Payment method selection
"Edit" option to go back

Step 3: Payment

Payment gateway integration (Razorpay/Paytm)
Amount display
Payment methods: UPI, Card, Wallet, Net Banking
QR code generation after successful payment
Email confirmation sent

Business Rules:

Minimum subscription: 7 days
Start date: Today onwards
Cancellation allowed with 3-day notice
Cancellation fee: 15% of remaining amount
Refund processing: 7-10 business days

### 5.2.5 Subscription Management
Features:

Dashboard View:

Active subscriptions (cards)
Expired subscriptions
Cancelled subscriptions

Subscription Card:

Mess name, photo
Plan name
Start date, End date
Days remaining
Status badge (Active/Expired/Cancelled)
"View Details" button

Subscription Details:

Full plan information
QR code for attendance
Attendance history (calendar view)
Payment receipt (downloadable PDF)
"Cancel Subscription" button (if active)
Renewal reminder (7 days before expiry)

Cancellation Flow:

Show refund calculation
Confirm cancellation reason (dropdown + text)
Process refund
Update subscription status
Send cancellation confirmation email

### 5.2.6 QR Code & Attendance
Features:

QR Code Display:

Unique QR code per subscription
Downloadable as image
Can be saved to phone

Attendance Tracking:

Calendar view showing check-ins
Meal-wise attendance (Breakfast, Lunch, Dinner)
Attendance rate percentage
Missed meals highlighted

Check-in Process (Student Side):

Show QR code to mess owner
Owner scans QR code
Attendance marked automatically
Confirmation notification

### 5.2.7 Payment History
Features:

Transaction List:

Date, Mess name, Plan, Amount, Status
Filter by: All, Success, Failed, Refunded
Sort by: Date, Amount

Transaction Details:

Transaction ID
Payment method
Amount breakdown (Plan price, GST, Discount)
Invoice (downloadable PDF)
Refund status (if applicable)

Invoice Format:

MessConnect letterhead
Transaction details
Student details
Mess details
GST breakdown (if applicable)

### 5.2.8 Reviews & Ratings
Features:

Write Review:

Can only review subscribed messes
One review per mess
Rating: 1-5 stars
Title (optional)
Review text (min 50 characters)
Upload photos (max 5)
Submit button

Review Display:

Shows on mess detail page
Verified purchase badge
Helpful count
Owner response (if any)

Review Management:

Edit review (within 48 hours)
Delete review
View owner responses

Validation:

Must have active or expired subscription (verified purchase)
Minimum 50 characters for review text
Cannot submit empty review

### 5.2.9 Profile & Settings
Features:

Profile Information:

Full name, Email, Phone
Profile photo (upload)
Edit profile button

Account Settings:

Change password
Email notifications (On/Off)
Push notifications (On/Off)
SMS notifications (On/Off)

Student Verification (Optional):

Upload student ID card
College name
Student ID number
Verification status (Pending/Approved/Rejected)
Benefits: Verified badge, Exclusive discounts

Preferences:

Dietary preferences (Veg/Non-veg/Jain)
Favorite messes (saved list)
Cuisine preferences

Account Actions:

Logout
Delete account (with confirmation)

👨‍🍳 MESS OWNER FEATURES
### 5.2.10 Owner Dashboard
Features:

Key Metrics Cards:

Active Subscribers (count, trend)
Monthly Revenue (₹ amount, trend)
Average Rating (★ rating, review count)
Pending Reviews (count)

Today's Attendance:

Breakdown by meal (Breakfast, Lunch, Dinner)
Check-in count per meal
Attendance rate %

Recent Subscriptions:

Last 5 new subscribers
Student name, phone
Plan, Start date
Status badge

Quick Actions:

Update Menu (quick link)
QR Scanner (quick link)
View Reviews (quick link)
Revenue Analytics (quick link)

Notifications:

Pending review responses
Verification status
Settlement updates

### 5.2.11 Menu Management
Features:

Date Selector:

Calendar view
Select date (today or future up to 7 days)
View/Edit menu for selected date

Menu Editor (Per Meal):

Breakfast section
Lunch section
Dinner section
Each section:

Add item (+ button)
Item name input field
Remove item (trash icon)
Drag to reorder (optional)

Bulk Operations:

Copy from yesterday
Copy from any previous date
Bulk update for week
Menu templates (save & reuse)

Save & Publish:

Save as draft
Publish menu (visible to students)
Schedule future menus

Menu History:

View past menus
Copy past menus

Validation:

At least one item required per active meal
Max 20 items per meal
Auto-save every 30 seconds

### 5.2.12 Subscriber Management
Features:

Subscribers List:

Search by name, phone
Filter by: Status (Active/Expired/Cancelled), Plan
Sort by: Name, Start Date, End Date
Table view: Student, Plan, Start Date, End Date, Status, Actions

Subscriber Details:

Student information (Name, Phone, Email)
Current plan details
Subscription history
Attendance record

Calendar view
Meal-wise breakdown
Total attendance %

Payment history
Notes (owner can add internal notes)

Actions:

View QR code
Contact student (call/email)
Add internal note
Export subscriber list (CSV/Excel)

Analytics:

Total subscribers (current)
Churn rate
Average subscription duration
Revenue per subscriber

### 5.2.13 QR Code Scanner
Features:

Scanner Interface:

Meal selection (Breakfast/Lunch/Dinner) - Required first
Camera view for QR scanning
"Start Scanning" button
Manual entry option (backup)

Scanning Process:

Owner selects current meal
Opens QR scanner
Student shows QR code
Scanner reads QR code
Verifies subscription validity
Shows student details for confirmation
"Mark Attendance" button
Confirmation message
Ready to scan next student

Verification Checks:

QR code is valid
Subscription is active
Not expired
Selected meal is included in plan
Not already checked in for this meal today

Success Screen:

✅ Check mark
Student name
Plan name
Meal confirmed
Time stamped
"Scan Next" button

Error Handling:

Invalid QR code
Expired subscription
Meal not in plan
Already checked in
Clear error messages

Today's Check-ins:

Live list below scanner
Student name, Meal, Time
Auto-updates after each scan
Filter by meal type

Technical:

Uses html5-qrcode library
Works on mobile & desktop
Camera permission required
Offline support (syncs when online)

### 5.2.14 Revenue & Settlements
Features:

Revenue Overview:

This Month: Total revenue, Platform fee (5%), Net revenue
Last Month: Comparison
Trend graph (last 6 months)

Revenue Chart:

Daily revenue (bar chart)
Plan-wise breakdown (pie chart)
Subscriber growth (line chart)

Settlements:

Settlement schedule (e.g., Weekly every Monday)
Pending settlement amount
Last settlement date & amount
Settlement history table

Date, Amount, UTR, Status, Download

Bank account details (for settlements)

Transactions:

All subscription transactions
Date, Student, Plan, Amount, Status
Filter by date range, status
Export to Excel

Analytics:

Average revenue per subscriber
Most popular plan
Revenue forecast (next month)

Settlement Process:

Platform holds funds for T+7 days
Auto-settlement to registered bank account
Email notification before settlement
SMS confirmation after settlement

### 5.2.15 Reviews & Feedback Management
Features:

Reviews Dashboard:

Overall rating (average)
Total reviews
Rating distribution (5★ to 1★ bar chart)
Response rate %

Reviews List:

Filter: All, Pending Response, Responded, Rating (5-1)
Sort: Recent, Helpful, Rating
Review card:

Student name (or anonymous)
Rating stars
Review title & text
Date
Photos (if any)
Helpful count
Owner response (if any)
"Respond" button

Respond to Review:

Review details display
Response text area (max 500 characters)
"Post Response" button
Response shows on student's review
Email notification to student

Review Analytics:

Monthly review trend
Most common keywords (word cloud)
Sentiment analysis (Positive/Neutral/Negative %)
Topics mentioned (Food Quality, Service, Cleanliness, etc.)

Best Practices Shown:

Respond within 24 hours
Address concerns professionally
Thank for positive feedback
Offer resolution for complaints

### 5.2.16 Mess Profile & Settings
Features:

Mess Profile:

Mess name
Description (1000 characters)
Type (Pure Veg/Veg & Non-veg/Non-veg only)
Photos (upload up to 10)
Features (checkboxes): AC, WiFi, Parking, Water Purifier, etc.
Seating capacity
Contact details (phone, email)
Location (address, city, Google Maps link)
Timings (Breakfast, Lunch, Dinner - start & end times)

Subscription Plans:

Create plan:

Plan name
Meals included (checkboxes)
Duration (days)
Price (₹)
Active/Inactive toggle

Edit/Delete existing plans
At least one active plan required

Account Settings:

Change password
Notification preferences
Settlement bank account

Account holder name
Bank name
Account number
IFSC code

GST details (optional)

Verification Status:

Show current status (Pending/Under Review/Approved/Rejected)
View submitted documents
Re-upload if rejected
Rejection reason (if applicable)

### 5.2.17 Document Upload & Verification
Features:

Verification Status Banner:

Pending: ⚠️ "Complete document upload to go live"
Under Review: ⏳ "Documents under review (24-48 hrs)"
Approved: ✅ "Verified! Your mess is now live"
Rejected: ❌ "Please fix and resubmit"

Document Upload Form:
# 1. FSSAI License (Mandatory):

License number (14 digits)
License type (Basic/State/Central)
Expiry date
Upload certificate (JPG/PNG/PDF, max 5MB)

# 2. Business Documents:

PAN card number & upload
GST certificate number & upload (optional)
Shop Act license number & upload (optional)

# 3. Bank Account:

Account holder name
Bank name
Account number
IFSC code
Upload cancelled cheque/bank statement

# 4. Location:

Complete address
Latitude/Longitude (auto-detected or manual)
Google Maps link

# 5. Mess Photos (Min 5, Max 10):

Interior photos
Kitchen area photos
Food samples photos
Multi-file upload

Submit for Verification:

Review all uploaded documents
Agree to terms & conditions
Submit button
Confirmation message
Email notification sent

Validation:

All mandatory fields required
File size limits enforced
File type validation (images/PDF only)
FSSAI license expiry must be future date
Minimum 5 photos required

Post-Submission:

Status changes to "Under Review"
Admin receives notification
Owner can track status
Email updates at each stage

👨‍💼 ADMIN FEATURES
### 5.2.18 Admin Dashboard
Features:

Platform Overview:

Total Users (Students, Owners, breakdown)
New users this month
Total Messes (Verified, Pending, Active)
Active Subscriptions
Monthly Revenue (Gross, Platform Fee, Net)
Average Rating

Visual Analytics:

User growth chart (last 30 days)
Revenue trend (last 6 months)
Geographic distribution (map/chart)
User type pie chart

Alerts & Notifications:

Pending verifications count (red badge)
Support tickets (open count)
Failed transactions
System health status

Recent Activity:

Latest 5 user signups
Latest 5 mess applications
Latest 5 subscriptions
Latest 5 reviews

Quick Actions:

Verify messes
User management
View support tickets
Generate reports

### 5.2.19 User Management
Features:

User List:

Search by name, email, phone
Filter by: Role (Student/Owner/Admin), Verified (Yes/No), Active (Yes/No)
Sort by: Name, Email, Created Date
Pagination (20 per page)
Table columns: Name, Email, Phone, Role, Verified, Active, Created, Actions

User Details:

Full profile information
Account status
Registration date
Last login
Email verified status
Phone verified status
For Students:

Active subscriptions count
Total spent
Reviews written

For Owners:

Mess name (if verified)
Subscribers count
Revenue generated
Verification status

User Actions:

View full profile
Edit user details (name, email, phone)
Suspend account (with reason)
Activate account
Delete account (with confirmation, cannot undo)
Resend verification email
Reset password (send reset link)
Add admin notes

Bulk Actions:

Export user list (CSV/Excel)
Send bulk email
Suspend multiple accounts

### 5.2.20 Mess Verification & Approval
Features:

Verification Queue:

Tabs: Pending (count), Under Review, Approved, Rejected, All
Each application card shows:

Owner name, email, phone
Submission date
Days pending
Quick status badge
"Review" button

Verification Details Screen:
Owner Information:

Full name, Email, Phone
Registration date

Documents Uploaded:

FSSAI License:

Number, Type, Expiry Date
View/Download document
Verify button (mark as verified)

PAN Card:

Number
View/Download document

GST Certificate (if uploaded):

Number
View/Download

Bank Details:

Account holder, Bank name, Account number, IFSC
View cancelled cheque

Location:

Full address
View on Google Maps
Latitude/Longitude

Mess Photos (Gallery view):

All uploaded photos
Lightbox view on click
Minimum 5 photos requirement check

Verification Checklist:

 FSSAI license valid & verified
 PAN card verified
 Bank details verified
 Photos quality acceptable (min 5)
 Location verified
 Background check completed (optional)

Approval Flow:

Review all documents
Check verification checklist
Add internal notes (optional)
Fill mess details:

Mess name
Description
Type (Veg/Non-veg)
Features (select from list)
Default plans (optional, can be edited by owner later)

Click "Approve"
Confirmation dialog
Mess status → Approved
Mess created in database
Owner notified via email
Owner can now go live

Rejection Flow:

Select rejection reason (dropdown):

Invalid FSSAI license
Poor photo quality
Incomplete documents
Location mismatch
Failed background check
Other (specify)

Add detailed explanation (required, min 100 characters)
Allow resubmission checkbox
Click "Reject"
Confirmation dialog
Owner notified with reason
Status → Rejected
Owner can re-upload and resubmit

### 5.2.21 Financial Overview & Settlements
Features:

Revenue Dashboard:

Gross Revenue (all transactions)
Platform Fee (5% of gross)
Net Revenue (after settlements)
Pending Settlements (to owners)
Refunds Processed
Chart: Revenue trend (last 12 months)

Transaction List:

All platform transactions
Columns: Date, User, Mess, Amount, Type, Status, Fee, Actions
Filter: Date range, Status, Type
Export to Excel

Settlements:

Pending settlements list

Owner name, Mess name, Amount, Period
"Process Settlement" button

Settlement history

Date, Owner, Amount, UTR, Status

Settlement schedule management
Bulk settlement processing

Financial Reports:

Monthly revenue report
Settlement report
Tax report (GST breakdown)
Refund report
Generate custom report (date range, filters)

Analytics:

Revenue by city
Revenue by mess
ARPU (Average Revenue Per User)
LTV (Lifetime Value)
Churn analysis

### 5.2.22 Support Tickets & Disputes
Features:

Tickets Dashboard:

Summary cards: New, Open, Resolved, Total
Average response time
Satisfaction score
Filter: Status, Priority, Category, Assigned To

Ticket List:

Ticket ID, Subject, User, Category, Status, Priority, Created, Assigned
Color coding by priority (High-Red, Medium-Yellow, Low-Green)
Click to open ticket details

Ticket Details:

Ticket information
User details (name, email, phone, link to profile)
Conversation thread (user messages + admin responses)
Attachments (if any)
Status history
Assignment history

Ticket Actions:

Reply to user (text editor)
Change status (New/Open/Pending/Resolved/Closed)
Change priority
Assign to team member
Add internal note (not visible to user)
Escalate
Merge with another ticket
Set as FAQ candidate

Quick Actions:

Process refund
Suspend user
Manual subscription activation
Call user (click-to-call)

Response Templates:

Pre-defined templates for common issues
Insert template and customize
Save new templates

Dispute Management:

Student vs Owner disputes
Dispute type (Payment, Quality, Service, etc.)
Evidence from both parties
Admin investigation notes
Resolution options:

Full refund to student
Partial refund
Support owner (no refund)
Custom settlement

Both parties notified of decision

### 5.2.23 Analytics & Reports
Features:

User Analytics:

Total users trend
User acquisition by source (Organic, Social, Referral, Paid)
User retention (cohort analysis)
Active users (DAU, WAU, MAU)
User demographics (age, city, college)

Mess Analytics:

Total messes trend
Verification funnel (Applied → Approved → Active)
Top performing messes (by subscribers, revenue, rating)
Category distribution (Veg/Non-veg)
Geographic distribution

Revenue Analytics:

Revenue trend (daily, weekly, monthly)
Revenue by city
Revenue by mess
ARPU, LTV
Subscription plans popularity

Subscription Analytics:

New subscriptions trend
Active subscriptions
Churn rate
Renewal rate
Average subscription duration

Engagement Analytics:

QR code scan rate
Menu view frequency
Review submission rate
App usage patterns

Custom Reports:

Report builder (select metrics, dimensions, filters)
Save reports
Schedule email delivery
Export formats (PDF, Excel, CSV)

### 5.2.24 System Settings & Configuration
Features:

General Settings:

Platform name, logo, favicon
Support email, phone
Business hours
Terms & Conditions (rich text editor)
Privacy Policy (rich text editor)
Refund Policy (rich text editor)
About Us (rich text editor)

Business Rules:

Platform commission % (default 5%)
Featured listing fee
Premium badge fee
Min subscription duration (days)
Cancellation notice period (days)
Cancellation fee %
Max carryforward days

Payment Settings:

Payment gateway (Razorpay/Paytm)
API keys configuration
Settlement schedule (Weekly/Bi-weekly/Monthly)
Settlement day
Auto-settlement enable/disable

Email Settings:

SMTP configuration
Email templates:

Welcome email
OTP email
Subscription confirmation
Renewal reminder
Cancellation confirmation
Settlement notification

Test email functionality

Notification Settings:

Push notification enable/disable
SMS gateway configuration
Notification triggers configuration

Verification Settings:

FSSAI validation requirements
Min photos required
Verification SLA (hours)
Background check enable/disable
Auto-approval rules (if criteria met)

Feature Toggles:

Enable/Disable features:

QR attendance
Social login
Reviews
Featured listings
Multiple subscriptions per user

Admin User Management:

Add admin user (email, role, permissions)
Role management (Super Admin, Admin, Support, Finance)
Permissions matrix
Activity logs

System Health:

Server status
Database status
API health checks
Error logs
Performance metrics

Maintenance Mode:

Enable/Disable
Maintenance message
Scheduled maintenance

Backup & Recovery:

Database backup schedule
Manual backup trigger
Restore from backup

# 6. User Journey & Flows
## 6.1 Student Journey
### 6.1.1 Discovery to Subscription
Step 1: Landing Page
   ↓
Step 2: Sign Up (3 steps)
   ↓
Step 3: Browse Messes (filters/search)
   ↓
Step 4: View Mess Details
   ↓
Step 5: Check Today's Menu
   ↓
Step 6: Read Reviews
   ↓
Step 7: Select Subscription Plan
   ↓
Step 8: Choose Start Date
   ↓
Step 9: Review Order
   ↓
Step 10: Make Payment
   ↓
Step 11: Receive QR Code
   ↓
Step 12: Email Confirmation
Success Criteria:

Student completes signup < 2 minutes
Finds suitable mess within 3 searches
Completes payment within 5 minutes
Overall conversion rate > 15%

### 6.1.2 Daily Usage Flow
Morning:
# 1. Receive notification: "Lunch menu updated!"
# 2. Open app
# 3. View today's lunch menu
# 4. Decide to attend

Lunch Time:
# 1. Go to mess
# 2. Open app → Show QR code
# 3. Owner scans QR
# 4. Attendance marked
# 5. Eat meal

Evening:
# 1. Check attendance in app
# 2. View upcoming week's menus

## 6.2 Owner Journey
### 6.2.1 Onboarding to Go Live
Step 1: Sign Up (3 steps, select "Owner")
   ↓
Step 2: Email Verification
   ↓
Step 3: Upload Documents
   - FSSAI license
   - PAN card
   - Bank details
   - Mess photos
   ↓
Step 4: Submit for Verification
   ↓
Step 5: Wait for Admin Approval (24-48 hrs)
   ↓
Step 6: Approved! Setup Mess Profile
   - Add description
   - Upload more photos
   - Set timings
   ↓
Step 7: Create Subscription Plans
   ↓
Step 8: Upload First Menu
   ↓
Step 9: Mess Goes Live!
   ↓
Step 10: First Student Subscribes

### 6.2.2 Daily Operations Flow
Morning (7:00 AM):
# 1. Login to dashboard
# 2. Update today's menu (all meals)
# 3. Publish menu
# 4. Receive notification: "Menu published"

Breakfast Time (8-10 AM):
# 1. Open QR Scanner
# 2. Select "Breakfast"
# 3. Scan student QR codes
# 4. Mark attendance
# 5. View live check-in count

Afternoon:
# 1. Check subscriber list
# 2. View revenue dashboard
# 3. Respond to pending reviews

Evening:
# 1. Review today's attendance report
# 2. Plan tomorrow's menu

## 6.3 Admin Journey
### 6.3.1 Daily Monitoring
Morning:
# 1. Login to admin dashboard
# 2. Check key metrics
# 3. Review pending verifications (if any)
# 4. Check support tickets

Throughout Day:
# 1. Verify new mess applications
   - Review documents
   - Check photos
   - Approve/Reject
# 2. Respond to support tickets
# 3. Monitor transaction issues
# 4. Review flagged content

End of Day:
# 1. Generate daily report
# 2. Check settlement queue
# 3. Review analytics

## 6.4 Key User Flows (Detailed)
### 6.4.1 Subscription Purchase Flow
Flow Diagram:
[Mess Detail Page]
    ↓
[Click "Subscribe" on Plan]
    ↓
[Step 1: Plan Confirmation]
- Plan name, meals, price
- Start date selector
- End date auto-calculated
- Terms checkbox
    ↓
[Click "Proceed to Payment"]
    ↓
[Step 2: Review Order]
- Student info
- Mess info
- Plan details
- Amount breakdown
    ↓
[Click "Make Payment"]
    ↓
[Step 3: Payment Gateway]
- Select payment method
- Enter details
- Complete payment
    ↓
[Payment Success]
    ↓
[Subscription Created]
- QR code generated
- Email sent
- Redirected to subscription details
Alternative Flow (Payment Failed):
[Payment Failed]
    ↓
[Error Message]
    ↓
[Retry Payment] → Back to Step 3
    OR
[Cancel] → Back to Mess Detail Page

### 6.4.2 Mess Verification Flow
Flow Diagram:
[Owner Uploads Documents]
    ↓
[Submit for Verification]
    ↓
[Status: Under Review]
    ↓
[Admin Receives Notification]
    ↓
[Admin Opens Verification Queue]
    ↓
[Admin Reviews Documents]
- Check FSSAI validity
- Verify PAN
- Check photos quality
- Verify location
    ↓
[Decision Point]
If Approved:
[Fill Mess Details]
- Name, description, type
    ↓
[Click "Approve"]
    ↓
[Mess Created in Database]
    ↓
[Owner Notified]
    ↓
[Owner Sets Up Profile]
    ↓
[Mess Goes Live]
If Rejected:
[Select Rejection Reason]
    ↓
[Add Detailed Explanation]
    ↓
[Click "Reject"]
    ↓
[Owner Notified with Reason]
    ↓
[Owner Fixes Issues]
    ↓
[Owner Resubmits]
    ↓
[Back to Under Review]

# 7. Functional Requirements
## 7.1 Authentication & Authorization
Req IDRequirementPriorityAUTH-001System must support email/phone + password loginMust HaveAUTH-002System must support Google OAuth 2.0 loginMust HaveAUTH-003System must support Facebook OAuth loginShould HaveAUTH-004System must implement 3-step signup (Personal → Role → Verification)Must HaveAUTH-005System must send OTP to email for verificationMust HaveAUTH-006OTP must expire after 10 minutesMust HaveAUTH-007OTP must allow max 3 verification attemptsMust HaveAUTH-008System must enforce password strength (8+ chars, uppercase, lowercase, number, symbol)Must HaveAUTH-009System must provide "Remember Me" for 30 daysShould HaveAUTH-010System must support password reset via email linkMust HaveAUTH-011Password reset link must expire after 1 hourMust HaveAUTH-012System must implement JWT tokens (access: 15 min, refresh: 7-30 days)Must HaveAUTH-013System must logout user on token expiryMust HaveAUTH-014System must support role-based access (Student, Owner, Admin)Must Have

## 7.2 User Management
Req IDRequirementPriorityUSER-001Users must provide: Full Name, Email, Phone, PasswordMust HaveUSER-002Email must be unique across platformMust HaveUSER-003Phone must be unique and follow Indian format (10 digits, starts with 6-9)Must HaveUSER-004Users must select role during signup (Student/Owner)Must HaveUSER-005Students can optionally upload Student ID for verificationShould HaveUSER-006Verified students get special badgeShould HaveUSER-007Users can update profile (name, email, phone, photo)Must HaveUSER-008Users can change passwordMust HaveUSER-009Users can delete account (with confirmation)Should HaveUSER-010Deleted accounts cannot be recoveredMust HaveUSER-011Users can set notification preferences (Email, SMS, Push)Should HaveUSER-012Users can logout from all devicesShould Have

## 7.3 Mess Management
Req IDRequirementPriorityMESS-001Owners must complete document verification before listing messMust HaveMESS-002Owners must upload FSSAI license (mandatory)Must HaveMESS-003FSSAI license must be valid for at least 30 daysMust HaveMESS-004Owners must upload PAN cardMust HaveMESS-005Owners must provide bank account detailsMust HaveMESS-006Owners must upload minimum 5 mess photosMust HaveMESS-007Photos must be max 5MB each, formats: JPG, PNGMust HaveMESS-008Owners must provide complete address with Google Maps linkMust HaveMESS-009Owners can create multiple subscription plansMust HaveMESS-010Each plan must specify: Name, Meals, Duration, PriceMust HaveMESS-011At least one active plan required for mess to be visibleMust HaveMESS-012Owners can set mess as Active/InactiveMust HaveMESS-013Inactive messes are hidden from student searchMust HaveMESS-014Owners can update mess details anytimeMust HaveMESS-015Owners can upload/remove photos (min 5 must remain)Should Have

## 7.4 Menu Management
Req IDRequirementPriorityMENU-001Owners can update menu for any date (today to 7 days ahead)Must HaveMENU-002Menu must be divided into Breakfast, Lunch, DinnerMust HaveMENU-003Each meal section can have 1-20 itemsMust HaveMENU-004Owners can add/remove items from menuMust HaveMENU-005Owners can copy menu from previous datesShould HaveMENU-006Owners can save menu templates for reuseShould HaveMENU-007Menu auto-saves every 30 secondsShould HaveMENU-008Students can view today's menu on mess detail pageMust HaveMENU-009Students can view upcoming week's menuShould HaveMENU-010Students receive notification when menu is updatedShould Have

## 7.5 Subscription Management
Req IDRequirementPrioritySUBS-001Students can subscribe to multiple messes simultaneouslyShould HaveSUBS-002Minimum subscription duration is 7 daysMust HaveSUBS-003Students can select start date (today or future)Must HaveSUBS-004End date is auto-calculated based on durationMust HaveSUBS-005Students must complete payment to activate subscriptionMust HaveSUBS-006Each subscription generates unique QR codeMust HaveSUBS-007QR code must be downloadable and shareableMust HaveSUBS-008Students can view all subscriptions (Active, Expired, Cancelled)Must HaveSUBS-009Students can cancel active subscriptionsMust HaveSUBS-010Cancellation requires 3-day noticeMust HaveSUBS-011Cancellation fee is 15% of remaining amountMust HaveSUBS-012Refund is processed within 7-10 business daysMust HaveSUBS-013Students receive renewal reminder 7 days before expiryShould HaveSUBS-014Expired subscriptions show option to renewShould HaveSUBS-015Students can download subscription receipt/invoice as PDFShould Have

## 7.6 Attendance & QR System
Req IDRequirementPriorityATT-001Each subscription must have unique QR codeMust HaveATT-002QR code must encode subscription ID and security tokenMust HaveATT-003Owners can scan QR code using web cameraMust HaveATT-004Owner must select meal type before scanningMust HaveATT-005System must verify subscription is activeMust HaveATT-006System must verify meal is included in planMust HaveATT-007System must prevent duplicate check-in for same meal on same dayMust HaveATT-008Successful check-in must timestamp attendanceMust HaveATT-009Students can view attendance history in calendar formatMust HaveATT-010Attendance percentage must be calculated and displayedShould HaveATT-011Owners can view today's check-ins in real-timeMust HaveATT-012Owners can export attendance report (Excel/CSV)Should HaveATT-013System must work offline and sync when onlineNice to Have

## 7.7 Payment & Transactions
Req IDRequirementPriorityPAY-001System must integrate with payment gateway (Razorpay/Paytm)Must HavePAY-002System must support UPI, Cards, Wallets, Net BankingMust HavePAY-003Payment must be completed before subscription activationMust HavePAY-004Failed payments must show clear error messageMust HavePAY-005Students can retry payment after failureMust HavePAY-006Successful payment must send email confirmationMust HavePAY-007System must generate invoice with GST breakdownShould HavePAY-008Students can download invoice as PDFMust HavePAY-009All transactions must be logged in systemMust HavePAY-010Transaction history must be accessible to studentsMust HavePAY-011Platform commission is 5% of transaction amountMust HavePAY-012Owners receive 95% of transaction (after platform fee)Must HavePAY-013Settlements must occur on scheduled day (e.g., every Monday)Must HavePAY-014Owners must receive settlement notificationMust HavePAY-015Refunds must be processed to original payment methodMust Have

## 7.8 Reviews & Ratings
Req IDRequirementPriorityREV-001Students can only review messes they have subscribed toMust HaveREV-002One review per mess per studentMust HaveREV-003Reviews must include 1-5 star ratingMust HaveREV-004Review text must be minimum 50 charactersMust HaveREV-005Students can upload up to 5 photos with reviewShould HaveREV-006Reviews display "Verified Purchase" badgeMust HaveREV-007Students can edit review within 48 hoursShould HaveREV-008Students can delete their reviewsShould HaveREV-009Other students can mark review as "Helpful"Should HaveREV-010Owners can respond to reviewsMust HaveREV-011Owner response appears below reviewMust HaveREV-012Mess average rating auto-updates on new reviewMust HaveREV-013Rating distribution shown on mess detail pageShould HaveREV-014Reviews can be filtered by rating and dateShould Have

## 7.9 Verification & Approval
Req IDRequirementPriorityVER-001All mess applications must be admin-verified before going liveMust HaveVER-002Verification must check FSSAI license validityMust HaveVER-003Verification must check PAN card authenticityMust HaveVER-004Verification must check minimum 5 photos uploadedMust HaveVER-005Verification must check photo qualityShould HaveVER-006Admin must approve/reject within 48 hours (SLA)Should HaveVER-007Rejection must include detailed reasonMust HaveVER-008Rejected applications can be resubmittedMust HaveVER-009Approved messes must automatically go liveMust HaveVER-010Owner must receive email notification on approval/rejectionMust HaveVER-011Admin can suspend verified messes if violations foundMust Have

## 7.10 Notifications
Req IDRequirementPriorityNOT-001System must send OTP email during signupMust HaveNOT-002System must send welcome email after account creationShould HaveNOT-003System must send subscription confirmation emailMust HaveNOT-004System must send renewal reminder 7 days before expiryShould HaveNOT-005System must send cancellation confirmation emailMust HaveNOT-006System must send refund processed emailMust HaveNOT-007System must send verification status email to ownersMust HaveNOT-008System must send settlement notification to ownersMust HaveNOT-009Students must receive menu update notificationsShould HaveNOT-010Users can enable/disable notification typesShould Have

# 8. Technical Specifications
## 8.1 Technology Stack
Frontend:
Framework: React.js 18.x
Language: JavaScript (ES6+)
State Management: React Context API
Routing: React Router DOM 6.x
HTTP Client: Axios
UI Components: Custom components
Icons: React Icons
Forms: Formik + Yup
Notifications: React Toastify
Charts: Recharts / Chart.js
QR Code: html5-qrcode
Styling: CSS3 (Custom)
Backend:
Runtime: Node.js 18.x
Framework: Express.js 4.x
Language: JavaScript
Database: MongoDB 6.x
ODM: Mongoose 8.x
Authentication: JWT (jsonwebtoken)
Password Hashing: bcryptjs
Email: NodeMailer
File Upload: Multer
Validation: express-validator
Security: Helmet, CORS
Rate Limiting: express-rate-limit
Session: express-session
OAuth: Passport.js (Google, Facebook)
QR Generation: qrcode
Database:
Primary: MongoDB (NoSQL)
Hosting: MongoDB Atlas / Self-hosted
Backup: Daily automated backups
Retention: 30 days
Infrastructure:
Cloud: AWS / Azure / Google Cloud
Server: Node.js on Ubuntu 24.04
Web Server: Nginx (reverse proxy)
SSL: Let's Encrypt (auto-renewal)
CDN: Cloudflare
File Storage: AWS S3 / Azure Blob
Deployment: Docker containers
CI/CD: GitHub Actions / Jenkins
Third-Party Services:
Payment Gateway: Razorpay / Paytm
SMS: Twilio (future feature)
Email: Gmail SMTP / SendGrid
Maps: Google Maps API
Analytics: Google Analytics
Monitoring: New Relic / Datadog
Logging: Winston + CloudWatch

## 8.2 System Architecture
Architecture Pattern: MVC (Model-View-Controller)
┌─────────────────────────────────────────────┐
│           CLIENT LAYER (Frontend)            │
│  React.js SPA + React Router + Axios        │
└───────────────┬─────────────────────────────┘
                │ HTTPS/REST API
                │
┌───────────────▼─────────────────────────────┐
│         APPLICATION LAYER (Backend)          │
│  Express.js + Routes + Controllers          │
│  + Middleware + Authentication              │
└───────────────┬─────────────────────────────┘
                │
┌───────────────▼─────────────────────────────┐
│          BUSINESS LOGIC LAYER                │
│  Services + Validation + Authorization      │
└───────────────┬─────────────────────────────┘
                │
┌───────────────▼─────────────────────────────┐
│           DATA ACCESS LAYER                  │
│  Mongoose Models + MongoDB                  │
└─────────────────────────────────────────────┘
API Architecture: RESTful API
Authentication Flow:
User Login
   ↓
Validate Credentials
   ↓
Generate JWT Access Token (15 min expiry)
Generate JWT Refresh Token (7-30 days expiry)
   ↓
Store Refresh Token in Database
   ↓
Send Both Tokens to Client
   ↓
Client Stores Access Token in Memory
Client Stores Refresh Token in LocalStorage/Cookie
   ↓
Every API Request: Send Access Token in Header
   ↓
If Access Token Expired:
   → Client Calls /refresh-token with Refresh Token
   → Server Validates Refresh Token
   → Generate New Access Token
   → Return to Client

## 8.3 Database Schema
Collections:

users - User accounts (students, owners, admins)
messes - Mess listings
subscriptions - Student subscriptions
otps - Email OTPs
reviews - Student reviews
transactions - Payment transactions

Key Relationships:
users (1) ----< (many) subscriptions
users (1) ----< (many) reviews
users (1) ----< (1) messes [for owners]
messes (1) ----< (many) subscriptions
messes (1) ----< (many) reviews
subscriptions (1) ----< (many) attendance records [embedded]
Indexes:
users:
  - email (unique)
  - phone (unique)
  - role
  
messes:
  - owner (reference)
  - isVerified, isActive (compound)
  - location.city
  - rating.average (descending)
  - name, description (text search)

subscriptions:
  - student (reference)
  - mess (reference)
  - status
  - startDate, endDate (compound)

reviews:
  - mess (reference)
  - student (reference)
  - createdAt (descending)

## 8.4 API Endpoints
Base URL: https://api.messconnect.com/api
Authentication Endpoints:
POST   /auth/signup/step1           - Save personal details
POST   /auth/signup/step2           - Save role selection
POST   /auth/send-otp               - Send OTP to email
POST   /auth/verify-otp             - Verify OTP & create account
POST   /auth/resend-otp             - Resend OTP
POST   /auth/login                  - Login
POST   /auth/refresh-token          - Refresh access token
POST   /auth/logout                 - Logout
GET    /auth/google                 - Google OAuth
GET    /auth/google/callback        - Google callback
GET    /auth/facebook               - Facebook OAuth
GET    /auth/facebook/callback      - Facebook callback
POST   /auth/forgot-password        - Request password reset
POST   /auth/reset-password/:token  - Reset password
User Endpoints:
GET    /users/me                    - Get current user (protected)
PUT    /users/me                    - Update profile (protected)
DELETE /users/me                    - Delete account (protected)
Mess Endpoints:
GET    /messes                      - Get all messes (public)
GET    /messes/:id                  - Get mess details (public)
GET    /messes/:id/menu             - Get mess menu (public)
Subscription Endpoints:
POST   /subscriptions               - Create subscription (student, protected)
POST   /subscriptions/confirm-payment - Confirm payment (student, protected)
GET    /subscriptions/my-subscriptions - Get user subscriptions (student, protected)
POST   /subscriptions/:id/cancel    - Cancel subscription (student, protected)
Review Endpoints:
POST   /reviews                     - Create review (student, protected)
GET    /reviews/mess/:messId        - Get mess reviews (public)
POST   /reviews/:id/helpful         - Mark helpful (protected)
Owner Endpoints:
GET    /owner/dashboard             - Get dashboard (owner, protected)
GET    /owner/dashboard/revenue     - Get revenue analytics (owner, protected)
GET    /owner/menu                  - Get menu (owner, protected)
POST   /owner/menu                  - Update menu (owner, protected)
GET    /owner/menu/weekly           - Get weekly menu (owner, protected)
POST   /owner/menu/bulk             - Bulk update menu (owner, protected)
GET    /owner/subscribers           - Get subscribers (owner, protected)
GET    /owner/subscribers/:id       - Get subscriber details (owner, protected)
GET    /owner/subscribers/attendance/report - Attendance report (owner, protected)
POST   /owner/qr/verify             - Verify QR code (owner, protected)
POST   /owner/qr/mark-attendance    - Mark attendance (owner, protected)
GET    /owner/qr/today-checkins     - Today's check-ins (owner, protected)
GET    /owner/reviews               - Get reviews (owner, protected)
POST   /owner/reviews/:id/respond   - Respond to review (owner, protected)
GET    /owner/reviews/analytics     - Review analytics (owner, protected)
POST   /owner/documents/upload      - Upload documents (owner, protected)
GET    /owner/documents/status      - Get verification status (owner, protected)
Admin Endpoints:
GET    /admin/dashboard             - Get admin dashboard (admin, protected)
GET    /admin/users                 - Get all users (admin, protected)
GET    /admin/users/:id             - Get user details (admin, protected)
PUT    /admin/users/:id/suspend     - Suspend user (admin, protected)
PUT    /admin/users/:id/activate    - Activate user (admin, protected)
DELETE /admin/users/:id             - Delete user (admin, protected)
GET    /admin/verifications/pending - Pending verifications (admin, protected)
GET    /admin/verifications/:id     - Verification details (admin, protected)
POST   /admin/verifications/:id/approve - Approve verification (admin, protected)
POST   /admin/verifications/:id/reject - Reject verification (admin, protected)
Error Response Format:
json{
  "success": false,
  "message": "Error message here",
  "errors": [
    {
      "field": "email",
      "message": "Email is invalid"
    }
  ]
}
Success Response Format:
json{
  "success": true,
  "message": "Success message",
  "data": {
    // Response data
  }
}

## 8.5 Security Requirements
CategoryRequirementImplementationAuthenticationSecure password storagebcrypt with 10 salt roundsAuthenticationJWT token-based authAccess (15 min) + Refresh (7-30 days) tokensAuthenticationOTP security6-digit random, 10 min expiry, max 3 attemptsAuthorizationRole-based access controlStudent, Owner, Admin roles with permissionsData ProtectionHTTPS onlySSL/TLS certificates (Let's Encrypt)Data ProtectionEncrypted sensitive dataDatabase encryption at restInput ValidationServer-side validationexpress-validator on all endpointsInput SanitizationXSS preventionSanitize all user inputsSQL InjectionNoSQL injection preventionMongoose query sanitizationCSRF ProtectionCSRF tokensFor state-changing operationsRate LimitingAPI rate limiting100 requests/15 min (global), 3 requests/min (OTP)File UploadFile type validationWhitelist: JPG, PNG, PDFFile UploadFile size limitsMax 5MB per fileSession ManagementSecure session handlingHttpOnly cookies, secure flag in productionLoggingAudit logsAll admin actions loggedMonitoringSecurity monitoringReal-time alerts for suspicious activity

## 8.6 Performance Requirements
MetricRequirementTargetPage Load TimeHomepage< 2 secondsPage Load TimeMess listing page< 3 secondsPage Load TimeMess detail page< 2.5 secondsAPI Response TimeAuthentication< 500msAPI Response TimeSearch/Filter< 1 secondAPI Response TimeCRUD operations< 800msDatabase QuerySimple queries< 100msDatabase QueryComplex queries< 500msConcurrent UsersSupported10,000 simultaneous usersUptimeAvailability99.9% (43 minutes downtime/month)ScalabilityHorizontal scalingAuto-scale based on load

# 9. Design Requirements
## 9.1 Design System
Brand Colors:
cssPrimary:     #FF6B35 (Orange)
Primary Dark: #E85A2A
Secondary:   #004E89 (Blue)
Success:     #28A745 (Green)
Danger:      #DC3545 (Red)
Warning:     #FFC107 (Yellow)
Text Primary: #212529 (Dark Gray)
Text Secondary: #6C757D (Medium Gray)
Background:  #F8F9FA (Light Gray)
White:       #FFFFFF
Border:      #DEE2E6 (Light Border)
```

**Typography:**
```
Headings: Poppins (600-700 weight)
Body: Inter (400-500 weight)
Font Sizes:
  - H1: 32px
  - H2: 28px
  - H3: 24px
  - H4: 20px
  - Body: 16px
  - Small: 14px
  - Tiny: 12px
```

**Spacing:**
```
Base unit: 4px
Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48px
```

**Border Radius:**
```
Small: 4px
Medium: 8px
Large: 12px
XLarge: 16px
Round: 50%
```

**Shadows:**
```
Small: 0 2px 4px rgba(0,0,0,0.1)
Medium: 0 4px 12px rgba(0,0,0,0.1)
Large: 0 10px 40px rgba(0,0,0,0.15)
```

---

### **9.2 Component Library**

**Buttons:**
```
Primary: Orange background, white text
Secondary: White background, gray border
Danger: Red background, white text
Sizes: Small (32px), Medium (40px), Large (48px)
States: Default, Hover, Active, Disabled, Loading
```

**Input Fields:**
```
Height: 48px
Border: 1px solid #DEE2E6
Border Radius: 8px
Focus: Orange border + shadow
Error: Red border
With icon: 44px left padding
```

**Cards:**
```
Background: White
Border: 1px solid #DEE2E6
Border Radius: 12px
Padding: 24px
Shadow: Medium shadow
Hover: Lift effect (translateY -2px)

## 9.3 Responsive Breakpoints
css/* Mobile First Approach */
Mobile:  < 576px  (Default styles)
Small:   ≥ 576px  (Landscape phones)
Medium:  ≥ 768px  (Tablets)
Large:   ≥ 992px  (Desktops)
XLarge:  ≥ 1200px (Large desktops)
Layout:

Mobile: Single column, full width
Tablet: 2 columns for grids
Desktop: 3-4 columns for grids
Max container width: 1200px

## 9.4 Accessibility
RequirementStandardWCAG ComplianceLevel AAColor ContrastMinimum 4.5:1 for textKeyboard NavigationFull supportScreen ReadersARIA labels on all interactive elementsFocus IndicatorsVisible focus outlinesAlt TextAll images must have alt textForm LabelsAll inputs must have labelsError MessagesClear, actionable error messages

# 10. Security & Privacy
## 10.1 Data Privacy
GDPR/Data Protection Compliance:

Data Collection:

Only collect necessary data
Clear privacy policy
User consent for data processing

Data Storage:

Encrypted at rest
Secure backups
30-day retention for backups

Data Access:

Role-based access control
Audit logs for all data access
Regular access reviews

Data Deletion:

Users can delete accounts
Complete data removal within 30 days
Anonymize analytics data

Third-Party Sharing:

No selling of user data
Only share with payment gateways (encrypted)
Clear disclosure in privacy policy

Personal Data Collected:

Name, Email, Phone (users)
FSSAI, PAN, Bank details (owners)
Transaction history
Attendance records
Reviews and ratings

## 10.2 Security Measures
Application Security:

Input validation on all endpoints
XSS prevention (sanitize inputs)
SQL/NoSQL injection prevention
CSRF protection
Rate limiting
Secure headers (Helmet.js)
CORS configuration

Infrastructure Security:

SSL/TLS encryption (HTTPS only)
Firewall configuration
DDoS protection (Cloudflare)
Regular security audits
Penetration testing (quarterly)
Vulnerability scanning

Data Security:

Password hashing (bcrypt)
JWT tokens for authentication
Database encryption at rest
Secure file storage (S3 with ACL)
Backup encryption
Secure API keys management

## 10.3 Compliance
Food Safety:

Verify FSSAI licenses for all messes
Display FSSAI numbers on mess profiles
Regular compliance checks

Financial:

GST compliance (if applicable)
TDS deduction as per Indian tax law
Financial record keeping (7 years)

Legal:

Terms of Service (legally binding)
Privacy Policy (GDPR/DPDPA compliant)
Refund Policy (clearly stated)
User agreements

# 11. Performance Requirements
## 11.1 Performance Benchmarks
Frontend:

First Contentful Paint (FCP): < 1.8s
Largest Contentful Paint (LCP): < 2.5s
Time to Interactive (TTI): < 3.5s
Cumulative Layout Shift (CLS): < 0.1

Backend:

API response time (p50): < 200ms
API response time (p95): < 800ms
API response time (p99): < 1.5s
Database query time (p95): < 100ms

System:

Server CPU usage: < 70% average
Server memory usage: < 80%
Database connections: < 80% of pool

## 11.2 Scalability
Horizontal Scaling:

Load balancer (Nginx/AWS ELB)
Multiple backend instances
Auto-scaling based on CPU/memory
Min 2 instances, max 10 instances

Database Scaling:

MongoDB replica set (3 nodes)
Read replicas for heavy read operations
Sharding strategy (by city/region)

Caching:

Redis for session storage
CDN for static assets
API response caching (5-minute TTL)
Database query caching

## 11.3 Monitoring & Alerts
Metrics to Monitor:

API response times
Error rates (4xx, 5xx)
Database performance
Server health (CPU, memory, disk)
User activity (DAU, MAU)
Payment success rate
Uptime/downtime

Alerting:

Email alerts for critical issues
SMS alerts for downtime
Slack integration for team notifications
PagerDuty for on-call rotation

Logging:

Application logs (Winston)
Access logs (Nginx)
Error logs (Sentry)
Audit logs (admin actions)
Retention: 90 days

# 12. Analytics & Metrics
## 12.1 Key Performance Indicators (KPIs)
User Acquisition:

Daily/Weekly/Monthly Active Users (DAU/WAU/MAU)
New signups per day/week/month
Signup conversion rate (visitors → signups)
Source of signups (Organic, Social, Referral, Paid)

User Engagement:

Average session duration
Pages per session
Bounce rate
Return visitor rate
Feature usage (QR scans, menu views, reviews)

Business Metrics:

Gross Merchandise Value (GMV)
Platform revenue (commission)
Average Revenue Per User (ARPU)
Customer Lifetime Value (LTV)
Customer Acquisition Cost (CAC)
LTV:CAC ratio (target > 3:1)

Mess Metrics:

Total messes (verified, active)
New mess applications per week
Verification approval rate
Average subscribers per mess
Average mess rating

Subscription Metrics:

Active subscriptions
New subscriptions per day/week
Subscription renewal rate
Churn rate (monthly)
Average subscription duration
Most popular plans

Payment Metrics:

Payment success rate
Payment failure reasons
Refund rate
Average transaction value

Quality Metrics:

Average mess rating
Review submission rate
Review response rate (by owners)
Customer satisfaction score

## 12.2 Analytics Implementation
Tools:

Google Analytics 4 - User behavior tracking
Mixpanel - Product analytics
Hotjar - Heatmaps and session recordings
Custom Dashboard - Business metrics

Events to Track:
javascript// User events
- User Signup
- User Login
- User Logout
- Profile Updated

// Mess events
- Mess Viewed
- Menu Viewed
- Mess Searched
- Filters Applied

// Subscription events
- Subscription Started
- Plan Selected
- Payment Initiated
- Payment Success
- Payment Failed
- Subscription Cancelled

// Engagement events
- QR Code Generated
- QR Code Scanned
- Review Submitted
- Review Marked Helpful

// Owner events
- Menu Updated
- Document Uploaded
- Subscriber Viewed

# 13. Roadmap & Phases
## 13.1 Phase 1 - MVP Launch (Months 1-3)
Goal: Launch core platform with essential features
Features:

✅ User authentication (email + social login)
✅ Student signup & profile
✅ Owner signup & verification
✅ Mess listing & discovery
✅ Menu management (owner)
✅ Subscription purchase
✅ Payment integration
✅ QR-based attendance
✅ Reviews & ratings
✅ Admin verification dashboard

Target:

500 students
50 verified messes
2 cities (Pune, Mumbai)

## 13.2 Phase 2 - Growth & Optimization (Months 4-6)
Goal: Expand features, improve engagement
New Features:

📱 Mobile app (React Native)
📊 Advanced analytics dashboard (owner)
🔔 Push notifications
📧 Email marketing campaigns
💬 In-app chat (student ↔ owner)
🎁 Referral program
🏆 Loyalty points
📅 Subscription scheduling (future start dates)

Enhancements:

Improved search (autocomplete, filters)
Menu templates for owners
Bulk subscriber management
Advanced reporting

Expansion:

5 new cities (Bangalore, Delhi, Hyderabad, Chennai, Kolkata)

Target:

5,000 students
200 verified messes
7 cities

## 13.3 Phase 3 - Scale & Monetization (Months 7-12)
Goal: Scale platform nationally, optimize revenue
New Features:

🚀 Featured listings (paid promotion)
⭐ Premium mess badge (subscription)
📺 Banner ads (for related services)
🤝 B2B partnerships (colleges, PG aggregators)
🔍 AI-powered recommendations
📍 Location-based offers
💳 Wallet system (prepaid balance)
🎫 Meal vouchers (corporate tie-ups)

Business:

Introduce premium plans for messes
Featured placement fees
Advertisement slots
Corporate bulk subscriptions

Expansion:

15+ cities (Tier 1 & Tier 2)
Rural college towns

Target:

50,000 students
500 verified messes
₹5 Cr GMV

## 13.4 Phase 4 - Ecosystem & Innovation (Year 2+)
Goal: Build comprehensive student food ecosystem
New Features:

🏪 Marketplace (groceries, cooking essentials)
👩‍🍳 Home chef network (tiffin services)
🍽️ Catering for events
🥗 Meal planning & nutrition tracking
🤖 AI chatbot for support
🌍 Multi-language support
💱 Multi-currency (international expansion)

Expansion:

Expand to Tier 3 cities
Explore international markets (Bangladesh, Nepal, Sri Lanka)
Franchise model for operations

# 14. Success Metrics
## 14.1 Launch Success Criteria (First 3 Months)
MetricTargetMeasurementUser Signups500 studentsTotal registered usersVerified Messes50 messesApproved mess countActive Subscriptions200 subscriptionsActive subscription countGMV₹10 LakhTotal transaction valuePlatform Revenue₹50,0005% commission earnedAverage Rating4.3+Mess average ratingPayment Success Rate95%+Successful transactions %User Retention70%D7 retention rate

## 14.2 Year 1 Success Criteria
MetricTargetMeasurementTotal Users50,000 studentsRegistered usersActive Users30,000 studentsMonthly active usersVerified Messes500 messesApproved mess countCities7 citiesOperational citiesGMV₹5 CroreGross Merchandise ValuePlatform Revenue₹25 Lakh5% commissionSubscription Renewal Rate85%+Renewing subscriptions %Average Mess Rating4.5+Platform averageUser Satisfaction4.2+NPS scoreChurn Rate<15%Monthly churn

## 14.3 Quality Metrics
MetricTargetMess Verification Time<48 hours (avg)Support Ticket Response Time<2 hours (avg)Support Ticket Resolution Time<24 hours (avg)Payment Success Rate>95%Uptime99.9%Page Load Time<3 secondsAPI Response Time<500ms (p95)Bug-Free Releases95%+

# 15. Risks & Mitigation
## 15.1 Technical Risks
RiskImpactProbabilityMitigationServer DowntimeHighLowAuto-scaling, load balancing, 99.9% uptime SLAData BreachCriticalLowEncryption, security audits, penetration testingPayment Gateway FailureHighMediumBackup gateway, retry mechanism, clear error messagesDatabase CorruptionCriticalVery LowDaily backups, replica sets, point-in-time recoveryAPI Performance IssuesMediumMediumCaching, query optimization, monitoring, alertsThird-Party API FailureMediumLowFallback mechanisms, circuit breakers, error handling
Mitigation Plan:

Automated backups (daily)
Disaster recovery plan
Incident response team
Post-mortem analysis for outages
Regular security audits

## 15.2 Business Risks
RiskImpactProbabilityMitigationLow User AdoptionCriticalMediumStrong marketing, referral program, student ambassadorsMess Owner ResistanceHighMediumFree onboarding, training, customer success teamPayment DisputesMediumHighClear refund policy, efficient dispute resolutionRegulatory ChangesHighLowLegal compliance team, regular auditsCompetitor EntryHighMediumFirst-mover advantage, strong network effectsSeasonality (Semester Breaks)MediumHighAdvance planning, flexible plans, off-season promotions
Mitigation Plan:

Customer feedback loops
Regular market research
Legal counsel on retainer
Competitive analysis
Diversified revenue streams

## 15.3 Operational Risks
RiskImpactProbabilityMitigationFood Quality IssuesHighMediumStrict verification, regular audits, review systemFraudulent MessesHighLowFSSAI verification, background checks, user reportsCustomer Support OverloadMediumHighChatbot, FAQ, knowledge base, scale support teamVerification BottleneckMediumHighStreamlined process, additional verifiers, automationSettlement DelaysHighLowAutomated settlements, backup payment processor
Mitigation Plan:

Quality assurance team
Mystery shopper program
Escalation protocols
Process automation
Dedicated support team

# 16. Appendix
## 16.1 Glossary
TermDefinitionMessA food service provider offering daily meal subscriptions to studentsSubscriptionA time-bound meal plan purchased by a student from a messQR CodeQuick Response code used for contactless attendance markingGMVGross Merchandise Value - total transaction value on platformPlatform FeeCommission charged by MessConnect (5% of transaction)ARPUAverage Revenue Per UserLTVCustomer Lifetime ValueCACCustomer Acquisition CostChurn RatePercentage of users who stop using the platformDAU/MAUDaily/Monthly Active UsersFSSAIFood Safety and Standards Authority of IndiaVerified MessA mess approved by admin after document verification

## 16.2 Acronyms

API - Application Programming Interface
JWT - JSON Web Token
OTP - One-Time Password
CRUD - Create, Read, Update, Delete
SLA - Service Level Agreement
TTL - Time To Live
CORS - Cross-Origin Resource Sharing
XSS - Cross-Site Scripting
CSRF - Cross-Site Request Forgery
GDPR - General Data Protection Regulation
DPDPA - Digital Personal Data Protection Act (India)
CDN - Content Delivery Network
AWS - Amazon Web Services
S3 - Simple Storage Service

## 16.3 References
Technical Documentation:

React.js Documentation: https://react.dev
Node.js Documentation: https://nodejs.org
MongoDB Documentation: https://docs.mongodb.com
Express.js Documentation: https://expressjs.com

Industry Standards:

WCAG 2.1 Accessibility Guidelines
OWASP Top 10 Security Risks
REST API Best Practices
JWT Best Practices

Legal & Compliance:

FSSAI Guidelines: https://fssai.gov.in
GST India: https://gst.gov.in
Digital Personal Data Protection Act, 2023

## 16.4 Change Log
VersionDateChangesAuthor1.0Feb 25, 2026Initial PRD createdProduct Team

## 16.5 Approval
RoleNameSignatureDateProduct ManagerTech LeadDesign LeadBusiness Head