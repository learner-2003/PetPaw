import React from 'react';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h2>Welcome to PetPaw Dashboard 🐾</h2>
      <p>You are now logged in!</p>
      <p>More features coming soon... 😎</p>

      {/* ✅ Logout Button */}
      <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    color: '#333',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Dashboard;