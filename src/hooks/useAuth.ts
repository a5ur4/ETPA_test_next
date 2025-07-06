import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export const useRequireAuth = (redirectTo: string = '/login') => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            console.log('useRequireAuth: User not authenticated, redirecting to login');
            router.replace(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    return { isAuthenticated, isLoading };
};

export const useRedirectIfAuthenticated = (redirectTo: string = '/dashboard') => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            console.log('useRedirectIfAuthenticated: User authenticated, redirecting to dashboard');
            router.replace(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    return { isAuthenticated, isLoading };
};
