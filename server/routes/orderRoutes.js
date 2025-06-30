// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 🐾 Route to place order
router.post('/buy', (req, res) => {
  const { user_id, pet_id, buyer_name, buyer_email, address, phone } = req.body;

  const query = `
    INSERT INTO orders (user_id, pet_id, buyer_name, buyer_email, address, phone) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, pet_id, buyer_name, buyer_email, address, phone], (err, result) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Purchase failed' });
    }
    res.status(200).json({ message: 'Order placed successfully!' });
  });
});

// 🧾 Route to get orders for a user
router.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT orders.*, pets.name AS pet_name, pets.breed 
    FROM orders 
    JOIN pets ON orders.pet_id = pets.id 
    WHERE orders.user_id = ?
    ORDER BY orders.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('DB Fetch Error:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.json(results);
  });
});

module.exports = router;