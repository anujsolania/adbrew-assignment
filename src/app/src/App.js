import React, { useState, useEffect } from 'react';
import './App.css';

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8000/todos/');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch('http://localhost:8000/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTodo }),
      });

      if (response.ok) {
        setNewTodo('');
        fetchTodos(); // Refresh the list
      } else {
        console.error('Failed to create todo');
      }
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
