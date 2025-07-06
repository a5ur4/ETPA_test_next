import { api } from './api';
import { setCookie, destroyCookie } from 'nookies';
import { LoginSchema } from '@/schemas/login.schema';
import { handleApiError } from '@/utils/errorHandler';

interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export const authService = {
    async login(credentials: LoginSchema): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('auth/login', credentials);
            const { token } = response.data;

            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: false,
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return response.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    },

    async getCurrentUser() {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }

};
