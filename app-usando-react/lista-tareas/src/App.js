/*useState: Se utiliza para manejar el estado de la lista de tareas y el input
del usuario.*/
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState({});

  /*useEffect: Se utiliza para cargar la lista de tareas almacenada en el localStorage 
cuando se carga la página por primera vez.*/
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    const storedTaskStatus = JSON.parse(localStorage.getItem('taskStatus')) || {};
    setTaskStatus(storedTaskStatus);
  }, []);

  /*addTask: Esta función se encarga de agregar una nueva tarea a la lista.*/
  const addTask = () => {
    if (inputValue.trim() === '') return;
    const newTasks = [...tasks, { id: Date.now(), text: inputValue }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setInputValue('');
  };

  /*removeTask: Esta función elimina una tarea de la lista.*/
  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /*toggleTaskStatus: Esta función marca una tarea como completada.*/
  const toggleTaskStatus = (taskId) => {
    const updatedStatus = { ...taskStatus, [taskId]: !taskStatus[taskId] };
    setTaskStatus(updatedStatus);
    localStorage.setItem('taskStatus', JSON.stringify(updatedStatus));
  };

  /*editTask: Esta función permite al usuario editar una tarea existente*/
  const startEditingTask = (taskId, text) => {
    setEditingTaskId(taskId);
    setInputValue(text);
  };

  /*canceleditingTask: esta funcion nos permite cancelar la edidion de na tarea existente*/
  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setInputValue('');
  };

  const saveEditedTask = (taskId, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditingTaskId(null);
    setInputValue('');
  };

  return (
    <div className="app">
      <h1>Lista de Tareas</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTask}>Agregar</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={() => saveEditedTask(task.id, inputValue)}>Guardar</button>
                <button onClick={cancelEditingTask}>Cancelar</button>
              </div>
            ) : (
              <span
                style={{
                  textDecoration: taskStatus[task.id] ? 'line-through' : 'none',
                }}
                onClick={() => startEditingTask(task.id, task.text)}
              >
                {task.text}
              </span>
            )}
            <button onClick={() => removeTask(task.id)}>Eliminar</button>
            <button onClick={() => toggleTaskStatus(task.id)}>
              {taskStatus[task.id] ? 'Marcar como incompleta' : 'Marcar como completa'}
            </button>
            <button onClick={() => startEditingTask(task.id, task.text)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
