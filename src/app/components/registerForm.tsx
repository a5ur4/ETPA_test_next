'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '@/schemas/register.schema';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface RegisterFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const RegisterForm = ({ onSuccess, onCancel }: RegisterFormProps) => {
    const { register: authRegister } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema)
    });

    const handleRegister = async (data: RegisterSchema) => {
        try {
            setError(null);
            setIsLoading(true);
            
            const { confirmPassword, ...userData } = data;
            await authRegister(userData);
            
            reset();
            onSuccess?.();
        } catch (error: any) {
            console.error('Registration failed:', error);
            setError(error.message || 'Falha no cadastro. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset();
        setError(null);
        onCancel?.();
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Exibição de Erro */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Nome */}
            <div>
                <label htmlFor="name" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Nome Completo
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Digite seu nome completo"
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Digite seu email"
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Senha */}
            <div>
                <label htmlFor="password" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Senha
                </label>
                <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Digite sua senha"
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
            </div>

            {/* Confirmar Senha */}
            <div>
                <label htmlFor="confirmPassword" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Confirmar Senha
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword')}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirme sua senha"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-3 justify-center mb-2">
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 mt-2 h-11 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl focus:outline-none transition-colors shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 mt-2 h-11 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-xl focus:outline-none transition-colors shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                >
                    {isLoading && (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                    )}
                    <span>{isLoading ? 'Cadastrando...' : 'Cadastrar'}</span>
                </button>
            </div>
        </form>
    );
};
