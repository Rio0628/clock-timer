import axios from 'axios'

export const insertSession = payload => axios.post('/api/session', payload);
export const getAllSessions = () => axios.get('/api/session');
export const deleteSessionById = id => axios.delete(`/api/session/${id}`);
export const getMovieById = id => axios.get(`/api/session/${id}`);

const apis = { insertSession, getAllSessions, deleteSessionById, getMovieById };

export default apis;