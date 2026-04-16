# EduPulse — Student Feedback Review System

A full-stack feedback platform built with **React.js (Vite)**, **Express.js**, and **MongoDB**.

---

## 📁 Project Structure

```text
/
├── backend/
│   ├── server.js        ← Express + Mongoose API
│   └── package.json
└── frontend-app/        ← React app built with Vite
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Configure environment
Create a `.env` file in `/backend`:
```
MONGO_URI=mongodb://localhost:27017/feedbackdb
PORT=5001
```
> Note: We use port 5001 by default to avoid conflicts with other local services.
> Use MongoDB Atlas URI for cloud: `mongodb+srv://<user>:<pass>@cluster.mongodb.net/feedbackdb`

### 3. Run the server
```bash
# Development (auto-restart with nodemon)
npm run dev

# Production
npm start
```

Server runs at: **http://localhost:5001**

---

## 🖥 Frontend Setup

### 1. Install dependencies
```bash
cd frontend-app
npm install
```

### 2. Run the development server
```bash
npm run dev
```

The frontend will be available at **http://localhost:5173**.

> ⚠ Make sure the backend is running. The API base URL is set in the React components:
> ```js
> const API_BASE = "http://localhost:5001/api";
> ```

---

## 📡 API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/feedbacks`                | List all feedbacks       |
| GET    | `/api/feedbacks/:id`            | Get single feedback      |
| POST   | `/api/feedbacks`                | Submit new feedback      |
| PATCH  | `/api/feedbacks/:id/helpful`    | Upvote feedback          |
| DELETE | `/api/feedbacks/:id`            | Delete feedback          |
| GET    | `/api/analytics`                | Aggregated analytics     |

### Query Params (GET /api/feedbacks)
- `course` — filter by course name (partial match)
- `category` — filter by category
- `rating` — filter by exact star rating
- `sort` — e.g. `-createdAt`, `-rating`, `-helpful`

### POST Body Example
```json
{
  "studentName": "Aarav Mehta",
  "course": "Data Structures",
  "instructor": "Dr. Sharma",
  "rating": 4,
  "comment": "Great explanations, very engaging lectures.",
  "category": "Teaching Quality"
}
```

---

## ✨ Features
- Submit feedback with star ratings, categories, and comments
- Filter and sort reviews dynamically
- Upvote helpful reviews
- Analytics: course ratings, category breakdown, rating distribution
- Fully responsive dark UI
