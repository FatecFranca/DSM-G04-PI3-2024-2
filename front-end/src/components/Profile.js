import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import Header from './Header';

const Profile = () => {
  const { pomodoro, shortBreak, longBreak, tasks } = useContext(TimerContext);

  if (pomodoro === undefined || shortBreak === undefined || longBreak === undefined) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-card">
            <h2>Perfil do Usuário</h2>
            <div className="user-details">
              <div className="user-avatar">
                <img src="/default-avatar.png" alt="Avatar" />
              </div>
              <div className="user-info">
                <h3>Nome do Usuário</h3>
                <p>email@exemplo.com</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3>Configurações de Timer</h3>
            <div className="timer-settings">
              <div className="timer-item">
                <span className="timer-label">TomaFoco:</span>
                <span className="timer-value">{pomodoro} minutos</span>
              </div>
              <div className="timer-item">
                <span className="timer-label">Pausa Curta:</span>
                <span className="timer-value">{shortBreak} minutos</span>
              </div>
              <div className="timer-item">
                <span className="timer-label">Pausa Longa:</span>
                <span className="timer-value">{longBreak} minutos</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-card">
            <h3>Minhas Tarefas</h3>
            <div className="tasks-container">
              {tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <input type="checkbox" checked={task.completed} readOnly />
                  <span className={task.completed ? 'completed' : ''}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;