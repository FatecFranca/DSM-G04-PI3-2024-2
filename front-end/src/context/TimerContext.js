import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentMode, setCurrentMode] = useState('TomaFoco');
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => setIsActive(true);
  const pauseTimer = () => setIsActive(false);
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    resetTimer();
  };

  const switchMode = (mode) => {
    setCurrentMode(mode);
    setTime(25 * 60);
    setIsActive(false);
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks);
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        isActive,
        currentMode,
        ...settings,
        tasks,
        updateTasks,
        startTimer,
        pauseTimer,
        resetTimer,
        updateSettings,
        switchMode,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};