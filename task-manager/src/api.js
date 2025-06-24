const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}?_limit=10`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return await response.json();
};

export const addTaskAPI = async (task) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  if (!response.ok) throw new Error('Failed to add task');
  return await response.json();
};

export const updateTaskAPI = async (id, updatedTask) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask)
  });
  if (!response.ok) throw new Error('Failed to update task');
  return await response.json();
};

export const deleteTaskAPI = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return await response.json();
};