// client/src/pages/AddPet.js
import React, { useState } from 'react';
import axios from 'axios';

function AddPet() {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/pets', formData);
      alert('Pet added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add pet');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} /><br /><br />
        <input type="text" name="breed" placeholder="Breed" value={formData.breed} onChange={handleChange} /><br /><br />
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} /><br /><br />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} /><br /><br />
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} /><br /><br />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default AddPet;