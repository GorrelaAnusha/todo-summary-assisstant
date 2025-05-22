import axios from 'axios';

const API_BASE = 'http://localhost:8080';

export const fetchTodos = () => axios.get(`${API_BASE}/todos`);
export const addTodo = (text) => axios.post(`${API_BASE}/todos`, { text });
export const deleteTodo = (id) => axios.delete(`${API_BASE}/todos/${id}`);
export const updateTodo = (id, text) =>
  axios.put(`${API_BASE}/todos/${id}`, { text });

export const summarizeAndSendToSlack = (todos) =>
  axios.post(`${API_BASE}/summarize`, { todos });




