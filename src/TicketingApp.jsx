// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ConfirmSale from './pages/ConfirmSale';
import AdminHome from './pages/AdminHome';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

// const AdminRoute = ({ children }) => {
//     const { user, isAdmin } = useContext(AuthContext);
//     return user && isAdmin ? children : <Navigate to="/home" />;
// };

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/confirm-sale" element={<ConfirmSale />} />
                    {/* <Route path="/admin" element={
                        <AdminRoute>
                            <AdminHome />
                        </AdminRoute>
                    } />
                    <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
