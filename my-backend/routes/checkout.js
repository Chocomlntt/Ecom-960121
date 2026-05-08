const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/checkout', (req, res) => {

  const { items, email, cardNumber } = req.body;

  const errors = {};

  // validate cart
  if (!items || !Array.isArray(items) || items.length === 0) {
    errors.cart = 'Cart is empty';
  }

  // validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    errors.email = 'Invalid email';
  }

  // validate card
  const cardRegex = /^\d{16}$/;

  if (!cardNumber || !cardRegex.test(cardNumber)) {
    errors.cardNumber = 'Card must be 16 digits';
  }

  // return errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: 'fail',
      errors
    });
  }

  // calculate total
  const total = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  // save first item example
  const firstItem = items[0];

  const sql = `
    INSERT INTO orders (user_id, product_id, quantity, total_price)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      1,
      firstItem.id,
      firstItem.quantity,
      total
    ],
    function(err) {

      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'DB error'
        });
      }

      res.status(201).json({
        status: 'success',
        message: 'Order saved',
        orderId: this.lastID,
        total
      });

    }
  );

});

module.exports = router;