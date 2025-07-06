import axios from 'axios';
import { parseCookies } from 'nookies';

const { token } = parseCookies();

export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

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
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);