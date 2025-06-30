// server/controllers/petController.js
const { addPet } = require('../models/petModel');

const createPet = (req, res) => {
  const petData = req.body;
  addPet(petData, (err, result) => {
    if (err) {
      console.error("Failed to add pet:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'Pet added successfully' });
  });
};

module.exports = { createPet };