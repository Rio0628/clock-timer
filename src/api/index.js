import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000/api',});

export const insertSession = payload => api.post('/session', payload);
export const getAllSessions = () => api.get('/sessions');
export const deleteSessionById = id => api.delete(`/session/${id}`);
export const getMovieById = id => api.get(`/session/${id}`);

const apis = { insertSession, getAllSessions, deleteSessionById, getMovieById };

export default apis;