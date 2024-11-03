import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo_tomafoco from '../assets/logo_tomafoco.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <button onClick={() => navigate('/')} className="header-logo-button">
        <img src={logo_tomafoco} alt="Logo" className="header-logo" />
      </button>
      <h1 className="header-title">TomaFoco</h1>
      <div className="header-left">
        <button className="header-button" onClick={() => navigate('/login')}>Login</button>
        <button className="header-button" onClick={() => navigate('/signup')}>Registrar</button>
        <button className="header-button" onClick={() => navigate('/profile')}>Perfil</button>
      </div>
    </header>
  );
};

export default Header;