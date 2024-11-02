import React from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { TimerProvider } from './context/TimerContext';

function App() {
  return (
    <TimerProvider>
      <div className="app">
        <header className="app-header">
          <img src="" alt="Logo" className="header-logo" />
          <h1 className="header-title">TomaFoco</h1>
          <div className="header-left">
            <button className="header-button">Login</button>
            <button className="header-button">Perfil</button>
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

export default App;