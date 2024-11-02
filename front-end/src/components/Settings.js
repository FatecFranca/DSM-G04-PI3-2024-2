import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

function Settings() {
  const { pomodoro, shortBreak, longBreak, updateSettings } = useContext(TimerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({
      pomodoro: parseInt(e.target.pomodoro.value),
      shortBreak: parseInt(e.target.shortBreak.value),
      longBreak: parseInt(e.target.longBreak.value),
    });
  };

  return (
    <div className="settings">
      <h3>Configurar</h3>
      <form onSubmit={handleSubmit}>
        <label>
          TomaFoco:
          <input type="number" name="pomodoro" defaultValue={pomodoro} min="1" max="60" />
        </label>
        <label>
          Pausa Curta:
          <input type="number" name="shortBreak" defaultValue={shortBreak} min="1" max="60" />
        </label>
        <label>
          Pausa Longa:
          <input type="number" name="longBreak" defaultValue={longBreak} min="1" max="60" />
        </label>
        <button type="submit">Salve Configurações</button>
      </form>
    </div>
  );
}

export default Settings;