export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
export const AUTH_API = API_BASE + '/auth';
export const REQ_API = API_BASE + '/requests';
export function authUser(){ try { return JSON.parse(localStorage.getItem('user')); } catch(e){ return null } }
