import React, { useContext, useEffect } from 'react';
import { TimerContext } from '../context/TimerContext';

function Timer() {
  const { time, isActive, currentMode } = useContext(TimerContext);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    document.title = `${formatTime(time)} - Tomafoco`;
  }, [time]);

  return (
    <div className="timer">
      <h2>{currentMode}</h2>
      <div className="time">{formatTime(time)}</div>
    </div>
  );
}

export default Timer;