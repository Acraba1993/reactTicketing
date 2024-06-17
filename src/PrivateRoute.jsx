import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

const PrivateRoute = ({ children, isAdminRoute }) => {
  const { token, isAdmin } = useContext(AuthContext);
  console.log(isAdmin)

  if (!token) {
    return <Navigate to="/" />;
  }
  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default PrivateRoute;
