import React, { useState, useEffect, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { createTask, getTasks, deleteTask } from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { currentMode } = useContext(TimerContext);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const tarefasCarregadas = await getTasks();
      setTasks(tarefasCarregadas);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const handleTaskCompletion = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
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
        setTasks([...tasks, tarefaCriada]);
        setNewTask('');
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        alert('Erro ao criar tarefa. Por favor, verifique se está logado.');
      }
    }
  };

  return (
    <div className="task-list">
      <h3>Tarefas - {currentMode}</h3>
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