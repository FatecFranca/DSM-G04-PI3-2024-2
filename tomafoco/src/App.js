import React from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { TimerProvider } from './context/TimerContext';
// Cria um elemento de imagem
const img = document.createElement('img');

// Define o caminho da imagem
img.src = 'path/to/your/image.jpg';

// Define o texto alternativo
img.alt = 'Descrição da imagem';

// Adiciona a imagem ao corpo do documento


function App() {
  return (
    <TimerProvider>
      <div className="app">
        <img src="./logo_tomafoco.png" alt="TomaFoco" className="image" />
        <h1>TomaFoco</h1>
        <Timer />
        <Controls />
        <TaskList />
        <Settings />
      </div>
    </TimerProvider>
  );
}

export default App;