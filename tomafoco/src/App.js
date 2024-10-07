import React from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { TimerProvider } from './context/TimerContext';

function App() {
  return (
    <TimerProvider>
      <div className="app">
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