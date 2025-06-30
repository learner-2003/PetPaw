const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Add a new pet
router.post('/', (req, res) => {
  const { name, breed, age, price, image } = req.body;
  const query = 'INSERT INTO pets (name, breed, age, price, image) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, breed, age, price, image], (err, result) => {
    if (err) {
      console.error("Failed to insert pet:", err);
      return res.status(500).json({ error: 'Failed to add pet' });
    }
    res.status(201).json({ message: 'Pet added successfully' });
  });
});

// ✅ Get all pets
router.get('/all', (req, res) => {
  const query = 'SELECT * FROM pets ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

// 🗑️ Delete pet
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pets WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Pet deleted successfully' });
  });
});

// ✏️ Edit pet
router.put('/edit/:id', (req, res) => {
  const { name, breed, age, price, description } = req.body;
  const { id } = req.params;

  const query = 'UPDATE pets SET name = ?, breed = ?, age = ?, price = ?, description = ? WHERE id = ?';
  db.query(query, [name, breed, age, price, description, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Pet updated successfully' });
  });
});

module.exports = router;