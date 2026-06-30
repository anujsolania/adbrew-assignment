import React, { useState, useEffect } from 'react';
import './App.css';
import { todoService } from './services/api';

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await todoService.createTodo(newTodo);
      setNewTodo('');
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        {todos.length === 0 ? (
          <p>No todos yet. Create one below!</p>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>{todo.description}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h1>Create a ToDo</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="todo">ToDo: </label>
            <input
              id="todo"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter todo description..."
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <button type="submit">Add ToDo!</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
