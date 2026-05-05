const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email and password are required'
      });
    }

    const filePath = path.join(__dirname, '../data/users.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(file);

    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized'
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      status: 'success',
      token
    });

  } catch (error) {
    console.error('Login Error:', error);

    res.status(500).json({
      status: 'fail',
      message: 'Server error'
    });
  }
});

module.exports = router;