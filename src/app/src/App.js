import React, { useState, useEffect } from 'react';
import './App.css';
import { todoService } from './services/api';

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await todoService.fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setSubmitting(true);
    setError('');
    try {
      await todoService.createTodo(newTodo);
      setNewTodo('');
      await fetchTodos(); // Refresh the list
    } catch (err) {
      setError(err.message || 'Failed to create todo');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        {error && <div style={{ color: '#d9534f', margin: '10px 0', fontWeight: 'bold' }}>⚠️ {error}</div>}
        
        {loading ? (
          <p>Loading todos...</p>
        ) : todos.length === 0 ? (
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
              disabled={submitting}
            />
          </div>
          <div style={{ marginTop: '5px' }}>
            <button type="submit" disabled={submitting || !newTodo.trim()}>
              {submitting ? 'Adding...' : 'Add ToDo!'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
