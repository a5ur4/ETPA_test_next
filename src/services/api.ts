import axios from 'axios';
import { parseCookies } from 'nookies';

export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

const { token } = parseCookies();
if (token) {    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
    const { token } = parseCookies();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            return Promise.reject(new Error('Unauthorized access - please log in again.'));
        }
        return Promise.reject(error);
    }
);