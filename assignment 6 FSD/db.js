
const fs   = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, 'data', 'db.json');

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    const initial = {
      users:    [],
      products: [],
      inquiries: []
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
  }
}


function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

/* ── Write the whole database ───────────── */
function writeDb(data) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

/* ══════════════════════════════════════════
   USERS
══════════════════════════════════════════ */
const Users = {
  all() {
    return readDb().users;
  },

  findById(id) {
    return readDb().users.find(u => u.id === id) || null;
  },

  findByEmail(email) {
    return readDb().users.find(u => u.email === email.toLowerCase()) || null;
  },

  create({ name, email, password, phone = '', isAdmin = false }) {
    const db   = readDb();
    const user = {
      id:        uuidv4(),
      name:      name.trim(),
      email:     email.toLowerCase().trim(),
      password,              // already hashed by caller
      phone:     phone.trim(),
      isAdmin,
      wishlist:  [],         // array of product IDs
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
    writeDb(db);
    return user;
  },

  update(id, changes) {
    const db  = readDb();
    const idx = db.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    db.users[idx] = { ...db.users[idx], ...changes };
    writeDb(db);
    return db.users[idx];
  },

  toggleWishlist(userId, productId) {
    const db   = readDb();
    const user = db.users.find(u => u.id === userId);
    if (!user) return false;
    const idx = user.wishlist.indexOf(productId);
    if (idx === -1) user.wishlist.push(productId);
    else            user.wishlist.splice(idx, 1);
    writeDb(db);
    return idx === -1 ? 'added' : 'removed';
  }
};

/* ══════════════════════════════════════════
   PRODUCTS
══════════════════════════════════════════ */
const Products = {
  all() {
    return readDb().products;
  },

  findById(id) {
    return readDb().products.find(p => p.id === id) || null;
  },

  /* Full-text search + filter + sort + paginate */
  search({ search = '', category = '', condition = '', minPrice = '', maxPrice = '', sort = 'newest', page = 1, perPage = 12 }) {
    let list = readDb().products.filter(p => !p.isSold);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    if (category && category !== 'All') list = list.filter(p => p.category === category);
    if (condition && condition !== 'All') list = list.filter(p => p.condition === condition);
    if (minPrice !== '') list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice !== '') list = list.filter(p => p.price <= Number(maxPrice));

    // Sort
    const sorts = {
      newest:     (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      oldest:     (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      price_asc:  (a, b) => a.price - b.price,
      price_desc: (a, b) => b.price - a.price,
      popular:    (a, b) => b.views - a.views
    };
    list.sort(sorts[sort] || sorts.newest);

    const total = list.length;
    const start = (page - 1) * perPage;
    return { products: list.slice(start, start + perPage), total, totalPages: Math.ceil(total / perPage) };
  },

  create({ title, category, price, condition, description, location, image, seller }) {
    const db  = readDb();
    const product = {
      id:          uuidv4(),
      title:       title.trim(),
      category,
      price:       Number(price),
      condition:   condition || 'Good',
      description: description.trim(),
      location:    location ? location.trim() : 'Not specified',
      image:       image || '/images/placeholder.svg',
      seller: {
        id:    seller.id,
        name:  seller.name,
        email: seller.email,
        phone: seller.phone || ''
      },
      views:     0,
      isSold:    false,
      featured:  false,
      createdAt: new Date().toISOString()
    };
    db.products.push(product);
    writeDb(db);
    return product;
  },

  update(id, changes) {
    const db  = readDb();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    db.products[idx] = { ...db.products[idx], ...changes };
    writeDb(db);
    return db.products[idx];
  },

  delete(id) {
    const db  = readDb();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    db.products.splice(idx, 1);
    writeDb(db);
    return true;
  },

  incrementViews(id) {
    const db  = readDb();
    const idx = db.products.findIndex(p => p.id === id);
    if (idx !== -1) { db.products[idx].views += 1; writeDb(db); }
  },

  byUser(userId) {
    return readDb().products.filter(p => p.seller.id === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  related(productId, category, limit = 4) {
    return readDb().products
      .filter(p => p.category === category && p.id !== productId && !p.isSold)
      .slice(0, limit);
  },

  featured(limit = 3) {
    return readDb().products.filter(p => p.featured && !p.isSold).slice(0, limit);
  },

  latest(limit = 8) {
    return readDb().products
      .filter(p => !p.isSold)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }
};

/* ══════════════════════════════════════════
   INQUIRIES
══════════════════════════════════════════ */
const Inquiries = {
  inbox(recipientId) {
    const db = readDb();
    return db.inquiries
      .filter(i => i.recipientId === recipientId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(i => ({
        ...i,
        product: db.products.find(p => p.id === i.productId) || null
      }));
  },

  sent(senderId) {
    const db = readDb();
    return db.inquiries
      .filter(i => i.senderId === senderId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(i => ({
        ...i,
        product: db.products.find(p => p.id === i.productId) || null
      }));
  },

  unreadCount(recipientId) {
    return readDb().inquiries.filter(i => i.recipientId === recipientId && !i.isRead).length;
  },

  create({ productId, senderId, senderName, senderEmail, recipientId, recipientName, message }) {
    const db = readDb();
    const inq = {
      id:            uuidv4(),
      productId, senderId, senderName, senderEmail,
      recipientId, recipientName, message,
      isRead:        false,
      createdAt:     new Date().toISOString()
    };
    db.inquiries.push(inq);
    writeDb(db);
    return inq;
  },

  markAllRead(recipientId) {
    const db = readDb();
    db.inquiries.forEach(i => { if (i.recipientId === recipientId) i.isRead = true; });
    writeDb(db);
  }
};

module.exports = { Users, Products, Inquiries };
