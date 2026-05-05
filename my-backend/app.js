const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

async function findUserByEmail(email) {
  const filePath = path.join(__dirname, 'data', 'users.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const users = JSON.parse(data);
  return users.find(u => u.email === email);
}

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const hashedInput = md5(password);

    if (hashedInput !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'products.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    res.status(200).json(products);

  } catch (error) {
    console.error('Products Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app; // ✅ สำคัญมาก!!!