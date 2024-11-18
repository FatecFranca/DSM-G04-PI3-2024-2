import React, { useContext, useState, useEffect } from 'react';
import { TimerContext } from '../context/TimerContext';
import Header from './Header';

const Profile = () => {
  const { pomodoro, shortBreak, longBreak } = useContext(TimerContext);
  const [localTasks, setLocalTasks] = useState([]); // Tarefas ativas
  const [completedTasks, setCompletedTasks] = useState([]); // Tarefas finalizadas
  const [profileData, setProfileData] = useState(null); // Dados do usuário
  const [isLoading, setIsLoading] = useState(true); // Controle de carregamento

  useEffect(() => {
    const loadTasksAndProfile = async () => {
      try {
        setIsLoading(true);

        // Obter usuário do localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          console.error('Usuário não encontrado no localStorage');
          setIsLoading(false);
          return;
        }

        // Carregar tarefas do backend
        const taskResponse = await fetch(`http://localhost:3000/tasks/user/${user.id}`);
        const tasks = await taskResponse.json();
        setLocalTasks(tasks.filter((task) => task.status !== 'concluida')); // Tarefas ativas
        setCompletedTasks(tasks.filter((task) => task.status === 'concluida')); // Tarefas finalizadas

        // Simula carregamento do perfil
        setProfileData({
          nome: user.nome || 'Usuário',
          email: user.email || 'Email não disponível',
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar tarefas ou perfil:', error);
        setIsLoading(false);
      }
    };

    loadTasksAndProfile();
  }, []);

  const handleTaskCompletion = async (taskId) => {
    try {
      // Enviar requisição ao backend para atualizar o status da tarefa
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'concluida' }), // Atualiza o status para "concluída"
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar a tarefa.');
      }

      const updatedTask = await response.json();

      // Atualizar no frontend: mover a tarefa para o histórico
      setLocalTasks(localTasks.filter((task) => task.id !== taskId));
      setCompletedTasks([...completedTasks, updatedTask]); // Adiciona ao histórico
    } catch (error) {
      console.error('Erro ao concluir a tarefa:', error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>; // Exibe "Carregando" enquanto os dados são carregados
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
                <h3>{profileData?.nome}</h3>
                <p>{profileData?.email}</p>
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
              {localTasks.length > 0 ? (
                localTasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <input
                      type="checkbox"
                      onChange={() => handleTaskCompletion(task.id)}
                      checked={false}
                    />
                    <span>{task.titulo}</span>
                  </div>
                ))
              ) : (
                <p>Nenhuma tarefa ativa.</p>
              )}
            </div>
          </div>

          <div className="profile-card">
            <h3>Histórico de Tarefas Finalizadas</h3>
            <div className="tasks-container">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <div key={task.id} className="task-item completed">
                    <span>{task.titulo}</span>
                  </div>
                ))
              ) : (
                <p>Nenhuma tarefa finalizada ainda.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
