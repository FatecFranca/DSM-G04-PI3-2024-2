import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Header from './components/Header';
import { TimerProvider } from './context/TimerContext';

function MainApp() {
  return (
    <TimerProvider>
      <div className="app">
        <Header />
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
    <TimerProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </TimerProvider>
  );
}

export default App;