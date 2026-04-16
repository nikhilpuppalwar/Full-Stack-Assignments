# FSD Lab Assignment

This repository contains solutions for the following Front-End Development (FSD) tasks:

1. **Static HTML formatting tags table**
2. **Personal Portfolio page (HTML + CSS)**
3. **Dynamic e-commerce/fashion store web app (HTML + CSS + JS)**
4. **Interactive data visualization dashboard (Charts/Graphs)**
5. **Full-Stack Portfolio Website (Node.js, Express, MongoDB)**
6. **BAZAAR — Used Items Marketplace (Node.js, Express, JSON Storage)**
7. **EduPulse — Student Feedback System (Vite React, Node, Express, MongoDB)**

## 1) Static Web Page: HTML Text Formatting Tags

Create a static HTML page that lists **all important HTML text formatting tags** in a **tabular format**.

**Suggested columns:**
- Tag
- Description
- Example

**Deliverable:**
- `assignment1.html` (or `index.html` inside an `assignment-1/` folder)

## 2) Personal Portfolio Page (HTML + CSS)

Build a personal portfolio page using **HTML and CSS**.

**Requirements:**
- Sections like: `Home`, `About`, `Projects`, `Skills`, `Contact`
- Responsive layout
- Use Bootstrap via CDN if required (optional)

**Deliverables:**
- `assignment2/index.html`
- `assignment2/styles.css`

## 3) Dynamic Web App: Fashion Store / E-Commerce

Design and implement a dynamic web app similar to an **e-commerce/fashion store**, using **HTML, CSS, and JavaScript**.

**Suggested features (pick what fits your time):**
- Product listing (grid/cards)
- Product details view (modal/page)
- Cart functionality (add/remove/update quantity)
- Basic search/filter

**Bootstrap CDN**:
- You may use Bootstrap for layout and components.

**Deliverables:**
- `assignment3/index.html`
- `assignment3/styles.css`
- `assignment3/app.js`

## 4) Interactive Data Visualization Dashboard

Create an interactive dashboard for a **real-life application**, such as a **weather dashboard**.

**Requirements:**
- Use a charting library like **Chart.js** (or D3.js if you prefer)
- Display data using charts/graphs (bar/line/pie/etc.)
- Add interactivity (dropdowns, date range, tooltip insights, etc.)

**Deliverables:**
- `assignment4/index.html`
- `assignment4/styles.css` (if used)
- `assignment4/app.js` (chart logic)

## 5) Full-Stack Portfolio Website

A complete full-stack portfolio website built with **Node.js**, **Express.js**, and **MongoDB**. 
Includes a secure admin panel for managing projects, skills, experience, and contact messages.

**Requirements:**
- RESTful APIs for handling dynamic portfolio data.
- MongoDB Database modeled with Mongoose.
- Admin Panel with secret-code access control.

**Deliverables:**
- `assignment 5 FSD/server.js` (Express Server)
- `assignment 5 FSD/frontend/` (Vanilla JS/CSS/HTML UI)

## 6) BAZAAR — Used Items Marketplace

A modern, full-stack used items marketplace built with **Node.js** and **Express**, using a file-based JSON storage (`data/db.json`) instead of MongoDB for quick and seamless local testing out-of-the-box.

**Requirements:**
- Product listing, search, and filtering mechanics.
- Secure role-based authentication and a built-in messaging system.
- File upload handling using Multer for product images.

**Deliverables:**
- `assignment 6 FSD/app.js` (Express Server)
- `assignment 6 FSD/views/` (EJS Templates)

## 7) EduPulse — Student Feedback System

A modern MERN stack application built with **React.js (Vite)**, **Express.js**, and **MongoDB**. It serves as an interactive student feedback review platform with rich dashboard analytics.

**Requirements:**
- Submit and view course feedback with ratings.
- Fast, responsive React UI built with Vite.
- Real-time upvoting logic and dynamic analytics aggregation.

**Deliverables:**
- `assignment 7 FSD/frontend-app/` (React SPA)
- `assignment 7 FSD/backend/` (Node Express Server)

## How to Run

For **assignments 1-4**, tasks are static web pages/apps, so you can generally run them by opening the corresponding `index.html` file in your browser.

For **assignments 5-7**, which involve custom backend servers (Node.js/Express) and modern frontends (React), please refer to the specific `README.md` files inside their respective folders (`assignment 5 FSD`, `assignment 6 FSD`, `assignment 7 FSD`) for detailed setup, dependency installation (`npm install`), and startup commands (`npm start` or `npm run dev`).

## Notes

If you are using Bootstrap or chart libraries from CDN, ensure you include the correct `<link>` / `<script>` tags in each assignment page.

