import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmSale from './pages/ConfirmSale';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-sale" element={<ConfirmSale />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
