import React, { useState, useEffect, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { createTask, getTasks, deleteTask } from '../services/api';

function TaskList() {
  const [newTask, setNewTask] = useState('');
  const { tasks, updateTasks, currentMode } = useContext(TimerContext);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      carregarTarefas();
    }
  }, []);

  const carregarTarefas = async () => {
    try {
      const tarefasCarregadas = await getTasks();
      updateTasks(tarefasCarregadas);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      setError('Faça login para ver suas tarefas');
    }
  };

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
      alert('Erro ao excluir a tarefa.');
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          throw new Error('Usuário não está logado');
        }

        const novaTarefa = {
          titulo: newTask,
          descricao: '',
          usuarioId: user.id,
          status: 'ativa',
          data_criacao: new Date()
        };

        const tarefaCriada = await createTask(novaTarefa);
        const updatedTasks = [...tasks, tarefaCriada];
        updateTasks(updatedTasks);
        
        // Atualizar o cache do perfil
        const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
        profileData.tarefas = updatedTasks;
        localStorage.setItem('profileData', JSON.stringify(profileData));
        localStorage.setItem('profileCacheTime', Date.now().toString());
        
        setNewTask('');
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        alert('Erro ao criar tarefa. Por favor, verifique se está logado.');
      }
    }
  };

  if (!localStorage.getItem('user')) {
    return (
      <div className="task-list">
        <h3>Tarefas - {currentMode}</h3>
        <p>Faça login para gerenciar suas tarefas</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h3>Tarefas - {currentMode}</h3>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={addTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicione nova tarefa..."
        />
        <button type="submit">Adicionar Tarefa</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              onChange={() => handleTaskCompletion(task.id)}
              className="task-checkbox"
            />
            <span>{task.titulo}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;