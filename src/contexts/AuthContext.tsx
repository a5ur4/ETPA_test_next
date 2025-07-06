'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { parseCookies, destroyCookie } from 'nookies';
import { api } from '@/services/api';

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const isAuthenticated = !!user;

    useEffect(() => {
        const initAuth = async () => {
            try {
                const { token } = parseCookies();
                if (token) {
                    console.log('AuthContext: Token found, getting current user');
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const userData = await authService.getCurrentUser();
                    console.log('AuthContext: User data retrieved successfully');
                    setUser(userData);
                } else {
                    console.log('AuthContext: No token found');
                }
            } catch (error: any) {
                console.error('Auth initialization failed:', error);
                if (error?.response?.status === 401 || error?.response?.status === 403) {
                    console.log('AuthContext: Invalid token, clearing auth data');
                    destroyCookie(null, 'token');
                    delete api.defaults.headers.common['Authorization'];
                    setUser(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            console.log('AuthContext: Starting login process');
            setIsLoading(true);
            const authResponse = await authService.login({ email, password });
            console.log('AuthContext: Login successful, setting user');
            setUser(authResponse.user);
            console.log('AuthContext: User state updated');
        } catch (error) {
            console.error('AuthContext: Login failed', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            router.replace('/login');
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};