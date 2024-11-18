import React, { useContext, useState, useEffect } from 'react';
import { TimerContext } from '../context/TimerContext';
import Header from './Header';
import { getTasks, getProfile, deleteTask } from '../services/api';

const Profile = () => {
  const { pomodoro, shortBreak, longBreak, tasks, updateTasks } = useContext(TimerContext);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const loadProfileAndTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) return;

        // Carregar perfil
        const cachedProfile = localStorage.getItem('profileData');
        const cacheTime = localStorage.getItem('profileCacheTime');
        const CACHE_DURATION = 5 * 60 * 1000;

        if (cachedProfile && cacheTime) {
          const timeDiff = Date.now() - parseInt(cacheTime);
          if (timeDiff < CACHE_DURATION) {
            setProfileData(JSON.parse(cachedProfile));
          }
        }

        // Carregar tarefas atualizadas
        const tarefasCarregadas = await getTasks();
        updateTasks(tarefasCarregadas);

        // Atualizar perfil se necessário
        const data = await getProfile(user.id);
        setProfileData(data);
        
        localStorage.setItem('profileData', JSON.stringify(data));
        localStorage.setItem('profileCacheTime', Date.now().toString());
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados do perfil');
      }
    };

    loadProfileAndTasks();
  }, [updateTasks]);

  const handleTaskCompletion = async (taskId) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      updateTasks(updatedTasks);

      // Atualizar o cache do perfil
      const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
      profileData.tarefas = updatedTasks;
      localStorage.setItem('profileData', JSON.stringify(profileData));
      localStorage.setItem('profileCacheTime', Date.now().toString());
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      setError('Erro ao excluir a tarefa.');
    }
  };

  if (!profileData || pomodoro === undefined || shortBreak === undefined || longBreak === undefined) {
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
              <div className="user-info">
                <h3>{profileData.nome}</h3>
                <p>{profileData.email}</p>
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
              {tasks && tasks.map((task) => (
                <div key={task.id} className="task-item">
                  <input 
                    type="checkbox" 
                    onChange={() => handleTaskCompletion(task.id)}
                    checked={task.status === 'concluida'} 
                  />
                  <span className={task.status === 'concluida' ? 'completed' : ''}>
                    {task.titulo}
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