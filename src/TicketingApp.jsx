import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmSale from './pages/ConfirmSale';
import AdminHome from './pages/AdminHome';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm-sale" element={<ConfirmSale />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute isAdminRoute={true}>
              <AdminHome />
            </PrivateRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
