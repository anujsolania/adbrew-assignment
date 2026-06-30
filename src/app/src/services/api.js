const API_BASE_URL = 'http://localhost:8000';

export const todoService = {
  fetchTodos: async () => {
    const response = await fetch(`${API_BASE_URL}/todos/`);
    if (!response.ok) {
      throw new Error('Failed to load todos from the server');
    }
    return response.json();
  },

  createTodo: async (description) => {
    const response = await fetch(`${API_BASE_URL}/todos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to save todo item');
    }
    return response.json();
  }
};
