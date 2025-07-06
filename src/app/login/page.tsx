'use client';

import { loginSchema, LoginSchema } from '@/schemas/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { GoImage } from 'react-icons/go';

import logoEPTA from '@/assets/logo_EPTA.png';

const LoginPage = () => {
    const router = useRouter();
    const { login: authLogin, isAuthenticated, isLoading: authLoading } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, authLoading, router]);

    const handleLogin = async (data: LoginSchema) => {
        try {
            setError(null);
            setIsLoading(true);
            await authLogin(data.email, data.password);
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Login failed:', error);
            setError(error.message || 'Login failed. Please check your credentials and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex w-full max-w-4xl bg-gray-50 rounded-4xl overflow-hidden h-152">
                {/* Lado do Formulário */}
                <div className="w-full p-8 lg:w-1/2 flex flex-col justify-center">
                    <Image src={logoEPTA} alt="EPTA Tecnologia" className="mx-auto mb-4 h-10 w-auto" />
                    <p className="text-center text-gray-600 mb-8">Bem-vindo de volta! Insira seus dados.</p>

                    <form onSubmit={handleSubmit(handleLogin)} className="w-xs mx-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input {...register("email")} id="email" type="email" placeholder="Digite seu e-mail"
                                    className="w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_8px_10px_rgba(0,0,0,0.1)] border border-gray-400" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input {...register("password")} id="password" type="password" placeholder='Digite sua senha'
                                    className="w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_8px_10px_rgba(0,0,0,0.1)] border border-gray-400" />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
                        <button type="submit" disabled={isLoading}
                                className="w-full h-11 px-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-xl focus:outline-none transition-colors shadow-[0_10px_10px_rgba(0,0,0,0.2)]">
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-800 text-sm mt-25 font-medium">
                        Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Cadastre-se gratuitamente!</a>
                    </p>
                </div>

                {/* Lado da Imagem */}
                <div className="hidden lg:flex items-center justify-center w-1/2 bg-blue-400 p-8 ">
                    <span>
                        <GoImage className='text-blue-600 h-[60px] w-[60px]' />
                    </span>
                </div>
            </div>
        </main>
    )

}

export default LoginPage;