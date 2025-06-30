import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const user_id = 1; // 🔒 Replace with actual logged-in user ID

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/user/${user_id}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <table style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={thStyle}>Pet</th>
              <th style={thStyle}>Breed</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{order.pet_name}</td>
                <td style={tdStyle}>{order.breed}</td>
                <td style={tdStyle}>{order.buyer_name}</td>
                <td style={tdStyle}>{order.buyer_email}</td>
                <td style={tdStyle}>{order.phone}</td>
                <td style={tdStyle}>{order.address}</td>
                <td style={tdStyle}>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  fontWeight: 'bold'
};

const tdStyle = {
  padding: '8px',
  border: '1px solid #ccc'
};

export default MyOrders;