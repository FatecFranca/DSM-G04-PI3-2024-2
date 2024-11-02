import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

function Controls() {
  const { isActive, startTimer, pauseTimer, resetTimer } = useContext(TimerContext);

  return (
    <div className="controls">
      {!isActive ? (
        <button onClick={startTimer}>Inicio</button>
      ) : (
        <button onClick={pauseTimer}>Pausar</button>
      )}
      <button onClick={resetTimer}>Recomeçar</button>
    </div>
  );
}

export default Controls;