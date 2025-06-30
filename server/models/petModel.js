// server/models/petModel.js
const db = require('../config/db');

const addPet = (petData, callback) => {
  const { name, breed, age, price, image } = petData;
  const query = 'INSERT INTO pets (name, breed, age, price, image) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, breed, age, price, image], callback);
};

module.exports = { addPet };