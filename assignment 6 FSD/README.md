# 🛒 BAZAAR — Used Items Marketplace

A premium, full-stack used items marketplace built with Node.js and Express.

**No MongoDB. No database setup. No seed scripts.**
All data is stored purely in a flat `data/db.json` file. It is designed to run seamlessly out-of-the-box.

---

## 🚀 Getting Started & Run Guide

### Prerequisites
- You must have **Node.js** installed on your system.

### Step 1: Install Dependencies
Open your terminal inside the project directory and run:
```bash
npm install
```

### Step 2: Start the Server
You can start the server in two modes. We recommend Development mode so it auto-restarts if you make any changes to the code:
```bash
# Standard mode
npm start

# Development mode (auto-restarts on code changes using nodemon)
npm run dev
```

### Step 3: View the Application
Open your preferred web browser and navigate to:
**👉 http://localhost:3000**

---

## ⚡ Quick Login (Auto-Access)
To make demonstration and testing flawless, you no longer have to type any credentials!

When you visit `http://localhost:3000/auth/login`, simply click the **Admin Login** or **User Login** buttons at the bottom of the card. The system will auto-fill your credentials and immediately log you into your respective dashboard!

### Manual Demo Accounts
If you prefer to log in manually or test from scratch, use these credentials:
| Role  | Email                  | Password  |
|-------|------------------------|-----------|
| Admin | admin@bazaar.com       | Admin@123 |
| User  | rahul@example.com      | Admin@123 |

---

## ✅ Key Features

- **Store-front:** Browse, search, filter by category/condition, and sort listings effortlessly.
- **Listing Management:** Post new items with image uploads, edit your details, and mark items as "Sold" or "Relist" them.
- **Image Fallback:** Missing image uploads intelligently default to a modern SVG placeholder.
- **Wishlist:** Save your favorite items securely to your user profile.
- **Messaging system:** Dynamic inbox system allowing buyers and sellers to communicate seamlessly without exposing critical sensitive information.
- **Admin Privileges:** Admins have global permission to edit/delete any listing across the platform and feature unique listings on the homepage.
- **Pagination:** Clean, built-in layout limiting exactly 12 items per page.

---

## 📁 Project Architecture

```
bazaar/
├── app.js              ← Express server (entry point)
├── db.js               ← Custom JSON file ORM logic (Users, Products, Inquiries)
├── data/
│   └── db.json         ← All database data lives here (auto-generated if missing)
│
├── routes/
│   ├── index.js        ← Homepage & feature products
│   ├── products.js     ← Product CRUD operations + search/filter logic
│   ├── auth.js         ← Registration, Profiles, and Authentication logic
│   ├── wishlist.js     ← Manage saved items
│   └── inquiries.js    ← Buyer-seller messaging system
│
├── middleware/
│   ├── auth.js         ← Route guards checking for login/admin rights
│   └── upload.js       ← Multer image upload logic directly into public/uploads
│
├── views/
│   ├── index.ejs           ← Homepage view
│   ├── partials/           ← Reusable UI components (header, footer, cards)
│   ├── products/           ← Product-specific pages (view, create, edit)
│   ├── auth/               ← Auth templates with the Quick Login functionality
│   ├── wishlist/           
│   └── inquiries/          
│
└── public/
    ├── css/style.css       ← Custom modern styling
    ├── js/main.js          ← Frontend scripts
    ├── images/             ← Base assets (auto-generated placeholders)
    └── uploads/            ← User-uploaded product images
```

---

## 💾 How Data is Stored
Behind the scenes, everything is cached and saved persistently in `data/db.json`:

```json
{
  "users":     [ ...user objects... ],
  "products":  [ ...product listings... ],
  "inquiries": [ ...messaging chains... ]
}
```

No MongoDB, no cloud clusters, no setup required. It works completely offline locally on your own machine.
