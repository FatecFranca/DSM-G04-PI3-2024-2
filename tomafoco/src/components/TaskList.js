import React, { useState, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { currentMode } = useContext(TimerContext);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
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
        {tasks.map((task, index) => (
          <li key={index} onClick={() => toggleTask(index)}>
            <input type="checkbox" checked={task.completed} readOnly />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;