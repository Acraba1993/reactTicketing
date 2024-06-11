import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { navbarStyles } from '../../assets/styles/NavbarStyles'; // Importamos los estilos

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={navbarStyles.navbar}>
      {user ? (
        <>
          <span style={navbarStyles.userInfo}>Bienvenido, {user.name}</span>
          <button style={navbarStyles.button} onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <span style={navbarStyles.userInfo}>No estás autenticado</span>
      )}
    </div>
  );
};

export default Navbar;
