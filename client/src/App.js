// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPet from './pages/AddPet';
import PetList from './pages/PetList';
import MyOrders from './pages/MyOrders';
import ThankYou from './pages/ThankYou';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <Link to="/register" style={{ marginRight: '20px' }}>Register</Link>
        <Link to="/login" style={{ marginRight: '20px' }}>Login</Link>
        <Link to="/dashboard" style={{ marginRight: '20px' }}>Dashboard</Link>
        <Link to="/pets" style={{ marginRight: '20px' }}>Pet Listings</Link>
        <Link to="/add-pet" style={{ marginRight: '20px' }}>Add Pet</Link>
        <Link to="/my-orders">My Orders</Link>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/pets" element={<ProtectedRoute><PetList /></ProtectedRoute>} />
        <Route path="/add-pet" element={<ProtectedRoute><AddPet /></ProtectedRoute>} />
        <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;