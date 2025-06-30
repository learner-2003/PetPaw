import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PetList = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pets/all')
      .then(res => setPets(res.data))
      .catch(err => console.log('Error fetching pets:', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>🐾 Available Pets for Sale</h2>
      {pets.length === 0 ? (
        <p>No pets listed yet.</p>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px'
        }}>
          {pets.map(pet => (
            <div key={pet.id} style={{
              width: '260px',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              boxShadow: '0 0 10px #ccc',
              backgroundColor: '#fff'
            }}>
              {pet.image && (
                <img src={pet.image} alt={pet.name} style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }} />
              )}
              <h3>{pet.name}</h3>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Price:</strong> ₹{pet.price}</p>
              <p>{pet.description}</p>

              {/* Buy Now Button */}
              <button
                onClick={() => {
                  const buyer_name = prompt("Enter your name");
                  const buyer_email = prompt("Enter your email");
                  const address = prompt("Enter your address");
                  const phone = prompt("Enter phone number");

                  const user_id = 1; // 🔒 Replace with logged-in user's ID

                  axios.post("http://localhost:5000/api/orders/buy", {
                    user_id,
                    pet_id: pet.id,
                    buyer_name,
                    buyer_email,
                    address,
                    phone
                  }).then(() => {
                    window.location.href = "/thank-you"; // ✅ Redirect after success
                  }).catch(err => {
                    console.error('❌ Order error:', err);
                    alert("❌ Error placing order");
                  });
                }}
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Buy Now
              </button>

              {/* Edit Button */}
              <button
                onClick={() => {
                  const name = prompt("New name", pet.name);
                  const breed = prompt("New breed", pet.breed);
                  const age = prompt("New age", pet.age);
                  const price = prompt("New price", pet.price);
                  const description = prompt("New description", pet.description);

                  axios.put(`http://localhost:5000/api/pets/edit/${pet.id}`, {
                    name, breed, age, price, description
                  })
                    .then(() => {
                      alert("✅ Pet updated");
                      window.location.reload();
                    })
                    .catch(() => alert("❌ Failed to update pet"));
                }}
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  padding: "6px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this pet?")) {
                    axios.delete(`http://localhost:5000/api/pets/delete/${pet.id}`)
                      .then(() => {
                        alert("🗑️ Pet deleted");
                        window.location.reload();
                      })
                      .catch(() => alert("❌ Failed to delete pet"));
                  }
                }}
                style={{
                  marginTop: "10px",
                  padding: "6px 10px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetList;