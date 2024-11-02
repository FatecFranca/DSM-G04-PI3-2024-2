import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { TimerProvider } from './context/TimerContext';
import logo_tomafoco from './assets/logo_tomafoco.png';

function MainApp() {
  const navigate = useNavigate(); 

  return (
    <TimerProvider>
      <div className="app">
        <header className="app-header">
          <img src={logo_tomafoco} alt="Logo" className="header-logo" />
          <h1 className="header-title">TomaFoco</h1>
          <div className="header-left">
            <button className="header-button" onClick={() => navigate('/login')}>Login</button>
            <button className="header-button" onClick={() => navigate('/profile')}>Perfil</button>
          </div>
        </header>
        <div className="main-content">
          <div className="left-container">
            <Timer />
            <Controls />
            <Settings />
          </div>
          <div className="right-container">
            <TaskList />
          </div>
        </div>
      </div>
    </TimerProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
