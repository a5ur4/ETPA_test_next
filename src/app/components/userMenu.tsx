'use client';

import { useState, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from '@/contexts/AuthContext';

export const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isLoading } = useAuth();
    const menuRef = useRef<HTMLDivElement>(null);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch {
            return 'Data inválida';
        }
    };

    const formatDateTime = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString('pt-BR');
        } catch {
            return 'Data inválida';
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="absolute top-10 right-10" ref={menuRef}>
            <div className="relative">
                {/* User Menu Button */}
                <button 
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={isLoading}
                >
                    <RxAvatar className="w-8 h-8 text-gray-500" />
                    {user?.name ? (
                        <span className="text-sm font-medium text-gray-700">
                            {user.name}
                        </span>
                    ) : (
                        <span className="text-sm font-medium text-gray-700">
                            Usuário Desconhecido
                        </span>
                    )}
                    {isOpen ? (
                        <IoIosArrowUp className="w-4 h-4 text-gray-500" />
                    ) : (
                        <IoIosArrowDown className="w-4 h-4 text-gray-500" />
                    )}
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {/* User Info Section */}
                        <div className="px-4 py-3 border-b border-gray-100">
                            {isLoading ? (
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <RxAvatar className="w-10 h-10 text-gray-400" />
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm font-medium text-gray-900">
                                                {user?.name || 'Nome do Usuário'}
                                            </p>
                                            <div className="w-2 h-2 bg-green-400 rounded-full" title="Conectado"></div>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {user?.email || 'email@exemplo.com'}
                                        </p>
                                        {user?.id && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                ID: {user.id}
                                            </p>
                                        )}
                                        {user?.createdAt && (
                                            <p className="text-xs text-gray-400">
                                                Membro desde {formatDate(user.createdAt)}
                                            </p>
                                        )}
                                        {user?.updatedAt && (
                                            <p className="text-xs text-gray-400">
                                                Última atualização: {formatDateTime(user.updatedAt)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Logout Section */}
                        <div className="border-t border-gray-100 pt-2">
                            <button 
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors"
                            >
                                <FiLogOut className="w-4 h-4" />
                                <span>Sair</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};