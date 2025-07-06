import { api } from './api';
import { setCookie, destroyCookie } from 'nookies';
import { LoginSchema } from '@/schemas/login.schema';
import { handleApiError } from '@/utils/errorHandler';

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface LoginApiResponse {
    success: boolean;
    message: string;
    data: {
        user: User;
        token: string;
    };
}

interface AuthResponse {
    token: string;
    user: User;
}

interface GetUserApiResponse {
    success: boolean;
    data: User; // User data is directly in data, not data.user
}

export const authService = {
    async login(credentials: LoginSchema): Promise<AuthResponse> {
        try {
            console.log('AuthService: Making login request');
            const response = await api.post<LoginApiResponse>('/auth/login', credentials);
            console.log('AuthService: Login response received', response.data);
            
            if (response.data.success !== undefined && !response.data.success) {
                throw new Error(response.data.message || 'Login failed');
            }

            const { token, user } = response.data.data;
            console.log('AuthService: Extracted token and user', { userId: user.id, email: user.email });

            setCookie(null, 'token', token, {
                maxAge: 30 * 24 * 60 * 60, // 30 dias
                path: '/',
                secure: process.env.NODE_ENV === 'production',
                httpOnly: false,
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('AuthService: Token saved and authorization header set');

            return { token, user };
        } catch (error: any) {
            console.error('AuthService: Login error', error);
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw handleApiError(error);
        }
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            destroyCookie(null, 'token');
            delete api.defaults.headers.common['Authorization'];
        }
    },

    async getCurrentUser(): Promise<User> {
        try {
            const response = await api.get<GetUserApiResponse>('/auth/me');
                        
            if (response.data.success !== undefined) {
                if (!response.data.success || !response.data.data) {
                    throw new Error('Failed to get user data');
                }
                return response.data.data;
            } else {
                return response.data as any;
            }
        } catch (error) {
            console.error('AuthService: getCurrentUser error', error);
            throw handleApiError(error);
        }
    }

};
