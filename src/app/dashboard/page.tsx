'use client';

import { useEffect, useState } from "react";
import { Sidebar } from "../components/dashboard/sidebar";
import { UserMenu } from "../components/dashboard/userMenu";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth";
import { User } from "@/services/auth";
import { StatusTotal } from "../components/dashboard/statusTotal";
import { IoFileTray } from "react-icons/io5";
import { FaCheck, FaUser } from "react-icons/fa";

const DashboardPage = () => {
    const { user: contextUser, isLoading } = useAuth();
    const [localUser, setLocalUser] = useState<User | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('DashboardPage: Fetching user data...');
                const userData = await authService.getCurrentUser();
                console.log('DashboardPage: User data fetched successfully:', userData);
                setLocalUser(userData);
                setFetchError(null);
            } catch (error) {
                console.error('DashboardPage: Failed to fetch user data:', error);
                setFetchError(error instanceof Error ? error.message : 'Failed to fetch user data');
            }
        };

        if (!contextUser && !isLoading) {
            fetchUserData();
        } else if (contextUser) {
            setLocalUser(contextUser);
        }
    }, [contextUser, isLoading]);

    const user = contextUser || localUser;

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-grow p-6">
                <UserMenu />
                
                <div className="mt-16">
                    {/* Loading State */}
                    {(isLoading || (!user && !fetchError)) && (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <p className="text-gray-600">Carregando dados do usuário...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {fetchError && !user && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700">Erro ao carregar dados: {fetchError}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-2 text-red-600 hover:text-red-800 underline"
                            >
                                Tentar novamente
                            </button>
                        </div>
                    )}

                    {/* User Data Display */}
                    {user && (
                        <div className="space-y-4 p-5">
                            <h1 className="text-4xl font-medium text-gray-800">
                                Olá, {user.name},
                            </h1>
                            <h3 className="text-xl font-light text-gray-600">
                                Cadastre e gerencie seus veículos.
                            </h3>
                            <div className="flex gap-10">
                                <StatusTotal
                                    icon={<IoFileTray className="text-2xl text-blue-500 h-8 w-8" />}
                                    name="Total"
                                    total='350'
                                />
                                <StatusTotal
                                    icon={<FaCheck className="text-2xl text-green-500 h-8 w-8" />}
                                    name="Ativos"
                                    total='324'
                                />
                                <StatusTotal
                                    icon={<FaUser className="text-2xl text-orange-500 h-8 w-8" />}
                                    name="Inativos"
                                    total='26'
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;