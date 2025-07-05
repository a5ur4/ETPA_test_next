import axios from 'axios';
import { parseCookies } from 'nookies';

const { token } = parseCookies();

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

if (token) {    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}