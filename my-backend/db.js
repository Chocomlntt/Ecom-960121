const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'store.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB Error:', err.message);
  } else {
    console.log('✅ Connected to SQLite');
  }
});

// สร้าง table
db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    total_price REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;