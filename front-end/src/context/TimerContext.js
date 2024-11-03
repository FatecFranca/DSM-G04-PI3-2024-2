import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(1 * 60);
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
    const newTime = settings[currentMode.toLowerCase().replace(' ', '')] * 60;
    if (!isNaN(newTime)) {
      setTime(newTime);
    } else {
      console.error("Erro: O modo atual não é válido.");
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
    resetTimer();
  };

  const switchMode = (mode) => {
    setCurrentMode(mode);
    const newTime = settings[mode.toLowerCase().replace(' ', '')] * 60;
    if (!isNaN(newTime)) {
      setTime(newTime);
    } else {
      console.error("Erro: O modo selecionado não é válido.");
    }
    setIsActive(false);
  };

  return (
    <TimerContext.Provider
      value={{
        time,
        isActive,
        currentMode,
        ...settings,
        tasks,
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