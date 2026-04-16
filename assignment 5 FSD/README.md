# 🚀 Nikhil Puppalwar — Full-Stack Portfolio Website

> A complete full-stack portfolio website built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**. All portfolio data (projects, skills, experience) is stored in MongoDB and served via REST APIs. The frontend is vanilla HTML/CSS/JS with no frameworks. Includes a secure admin panel for managing everything.

---

## ✨ Features

- 🎨 **Modern Animated UI** — Glassmorphism, gradient effects, scroll animations
- 📦 **MongoDB Backend** — All content (projects, skills, experience) stored in and served from MongoDB
- 📬 **Contact Form** — Submissions stored in MongoDB, viewable in admin panel
- 🔐 **Secret-Code Admin Gate** — Protected admin access with rate limiting & lockout
- 🚀 **Project Management CMS** — Add, Edit, Delete projects directly from admin panel
- 🖼️ **Real Project Screenshots** — Projects display actual images from `/project_image/`
- 📄 **Linked Certificates** — Certification cards open real PDF files
- 🔗 **GitHub Links** — Each project card links to its specific GitHub repository

---

## 📁 Project Structure

```
assignment 5 FSD/
│
├── server.js                    ← Express server + MongoDB connection + auto-seed
├── package.json                 ← NPM dependencies
├── README.md                    ← This file
│
├── backend/
│   ├── models/
│   │   ├── Contact.js           ← Schema: name, email, message, date
│   │   ├── Project.js           ← Schema: title, description, techStack[], githubLink, imageUrl
│   │   ├── Skill.js             ← Schema: category, name, level (%)
│   │   └── Experience.js        ← Schema: role, company, duration, description[], order
│   └── routes/
│       ├── contact.js           ← POST /contact | GET /contact/messages | DELETE /contact/messages/:id
│       ├── projects.js          ← GET/POST /projects | PUT/DELETE /projects/:id
│       ├── skills.js            ← GET/POST /skills
│       └── experience.js        ← GET/POST /experience
│
└── frontend/
    ├── index.html               ← Main portfolio page
    ├── admin.html               ← Admin dashboard (auth-guarded)
    ├── admin-login.html         ← Secret code login gate
    ├── nikhil.jpg               ← Profile photo
    ├── css/
    │   └── styles.css           ← All frontend styles
    ├── js/
    │   └── script.js            ← Fetch API calls, rendering, animations
    ├── project_image/           ← Project screenshot images
    │   ├── WhatsAppClone.jpeg
    │   ├── AgroMart.jpg
    │   ├── LaundryMart.jpg
    │   └── SmartQuizzer.png
    └── certificate/             ← Certificate PDF files
        └── *.pdf
```

---

## ⚙️ Prerequisites

Ensure these are installed before running the project:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v16+ | https://nodejs.org |
| **MongoDB Community Server** | v6+ | https://www.mongodb.com/try/download/community |
| **npm** | Included with Node.js | — |

**Verify installations:**
```bash
node -v
npm -v
mongod --version
```

---

## 🛠️ Installation & Running

### 1. Open the project folder

```bash
cd "d:\Desktop\FSD LAB\assignment 5 FSD"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start MongoDB

> MongoDB must be running before you start the server.

```bash
# Option A — Run directly (keep this terminal open)
mongod

# Option B — Start as Windows Service (auto-runs on boot)
net start MongoDB
```

### 4. Start the Express server

```bash
node server.js
```

Expected output:
```
===========================================
🚀 Server running at: http://localhost:5000
📂 Portfolio:         http://localhost:5000/
🔧 Admin Panel:       http://localhost:5000/admin
===========================================
✅ Connected to MongoDB successfully!
🌱 Seeding projects...
✅ Projects seeded!
🌱 Seeding skills...
✅ Skills seeded!
🌱 Seeding experience...
✅ Experience seeded!
```

> **Auto-seeding:** On the very first run, the database is automatically populated with all 4 projects (with real images), skills, and experience data. Subsequent restarts skip seeding if data already exists.

---

## 🌐 Pages & URLs

| Page | URL | Description |
|------|-----|-------------|
| **Portfolio** | http://localhost:5000 | Main portfolio (public) |
| **Admin Login** | http://localhost:5000/admin-login | Secret code gate |
| **Admin Panel** | http://localhost:5000/admin | Dashboard (requires login) |

---

## 🔐 Admin Panel Access

1. Open **http://localhost:5000/admin-login**
2. Enter the secret code: **`nikhil@admin2026`**
3. You'll be redirected to the Admin Dashboard

> ⚠️ **Change the secret code** by editing line 78 in `server.js`:
> ```js
> const ADMIN_SECRET_CODE = 'nikhil@admin2026';
> ```

### Admin Panel Features

| Tab | Feature |
|-----|---------|
| 📬 **Messages** | View all contact form submissions, delete individually |
| 🚀 **Manage Projects** | Add new projects, edit existing ones, delete projects |

**Project Management modal fields:**
- Project Title
- Description
- Tech Stack (comma separated — e.g. `Kotlin, Firebase, MVVM`)
- GitHub Repository URL
- Image Path (e.g. `/project_image/MyApp.jpg`)

---

## 🔗 REST API Reference

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/contact` | Submit contact form `{ name, email, message }` |
| `GET` | `/contact/messages` | Get all messages (admin) |
| `DELETE` | `/contact/messages/:id` | Delete a message by ID |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects` | Get all portfolio projects |
| `POST` | `/projects` | Add a new project |
| `PUT` | `/projects/:id` | Update a project by ID |
| `DELETE` | `/projects/:id` | Delete a project by ID |

### Skills

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/skills` | Get all skills grouped by category |
| `POST` | `/skills` | Add a new skill |

### Experience

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/experience` | Get all experience entries |
| `POST` | `/experience` | Add a new experience entry |

### Admin Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/verify-admin` | Verify secret code `{ code }` → returns session token |

---

## 🗄️ MongoDB Database

- **Database name:** `portfolioDB`
- **Connection URI:** `mongodb://127.0.0.1:27017/portfolioDB`

### Collections

| Collection | Documents | Description |
|-----------|-----------|-------------|
| `projects` | 4 | Portfolio projects with images and GitHub links |
| `skills` | 16 | Skills grouped by category (Programming, Android, Backend, Tools) |
| `experiences` | 2 | Work/internship experience entries |
| `contacts` | dynamic | Contact form submissions |

---

## 🔄 Reset & Re-seed Database

If you want to reset data and trigger auto-seeding again:

```bash
node -e "
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/portfolioDB').then(async () => {
    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped. Restart server to re-seed.');
    process.exit(0);
});
"
```

Then restart:
```bash
node server.js
```

---

## 🛑 Troubleshooting

### ❌ `EADDRINUSE: address already in use :::5000`
Port 5000 is occupied. Kill the process:
```powershell
# Windows PowerShell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force
```

### ❌ `MongoDB connection failed`
MongoDB isn't running. Start it:
```bash
mongod
# OR as a service:
net start MongoDB
```

### ❌ Portfolio shows loading spinners / no content
The DB may be empty (no seed data). Restart the server — it auto-seeds on startup when collections are empty.

### ❌ Admin panel redirects back to login
The session token lives in `sessionStorage` — it clears when the browser tab is closed. Log in again at `/admin-login`.

### ❌ Project images not showing
Check that the image file exists in `frontend/project_image/` and the `imageUrl` field in MongoDB matches exactly (e.g. `/project_image/WhatsAppClone.jpeg`).

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Web Framework** | Express.js |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Fonts** | Google Fonts — Inter |
| **API Style** | RESTful |

---

## 📦 Dependencies

```json
{
  "express":  "^4.x",
  "mongoose": "^7.x",
  "cors":     "^2.x"
}
```

Install all with:
```bash
npm install
```

---

## 🗂️ Portfolio Sections

| Section | Source |
|---------|--------|
| **Hero** | Static (name, tagline, profile photo) |
| **About** | Static |
| **Skills** | `GET /skills` → MongoDB |
| **Experience** | `GET /experience` → MongoDB |
| **Projects** | `GET /projects` → MongoDB (with images + GitHub links) |
| **Certifications** | Static links → `/certificate/*.pdf` |
| **Contact** | `POST /contact` → MongoDB |

---

## 👤 Author

**Nikhil Puppalwar**
Android Developer | Full-Stack Learner

- 🐙 GitHub: [@nikhilpuppalwar](https://github.com/nikhilpuppalwar)
- Projects: WhatsApp Clone · Agri Mart · Laundry Mart · SmartQuizzer

---

## 📄 License

This project is built for **FSD Lab — Assignment 5**.
Free for educational use.
