import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import Header from './Header';

const Profile = () => {
  const { pomodoro, shortBreak, longBreak, tasks } = useContext(TimerContext);

  if (pomodoro === undefined || shortBreak === undefined || longBreak === undefined) {
    return <div>Carregando...</div>; // Adicione um carregamento ou mensagem de erro
  }

  return (
    <div className="profile">
      <Header />
      <h2>Perfil do Usuário</h2>
      <div className="user-info">
        <h3>Configurações de Timer</h3>
        <p>TomaFoco: {pomodoro} minutos</p>
        <p>Pausa Curta: {shortBreak} minutos</p>
        <p>Pausa Longa: {longBreak} minutos</p>
      </div>
      <div className="task-list">
        <h3>Lista de Tarefas</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <input type="checkbox" checked={task.completed} readOnly />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;