// frontend/src/components/Navbar.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">TONOTOS Company</div>
      <div className="navbar-options">
        <Link to="/" className="navbar-link">Inicio</Link>
        
        {user && (
          <>
            {user.role === 'admin' && <Link to="/admin" className="navbar-link">Admin</Link>}
            {user.role === 'moderator' && <Link to="/moderate" className="navbar-link">Moderar</Link>}
            {user.role === 'user' && <Link to="/user" className="navbar-link">Usuario</Link>}
            <button onClick={handleLogout} className="navbar-button">Cerrar Sesión</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="navbar-link">Iniciar Sesión</Link>
            <Link to="/register" className="navbar-link">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;