'use client';

import { useEffect, useState } from "react";
import { Sidebar } from "../components/dashboard/sidebar";
import { UserMenu } from "../components/dashboard/userMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useVehicle } from "@/contexts/VehicleContext";
import { authService } from "@/services/auth.service";
import { vehicleService } from "@/services/vehicle.service";
import { User } from "@/types/user";
import { Vehicle } from "@/types/vehicle";
import { StatusTotal } from "../components/dashboard/statusTotal";
import { IoFileTray } from "react-icons/io5";
import { FaCheck, FaUser } from "react-icons/fa";
import { ImSpinner11 } from "react-icons/im";

const DashboardPage = () => {
    const { user: contextUser, isLoading } = useAuth();
    const { vehicles, isLoading: isVehiclesLoading, error: vehiclesError, fetchVehicles } = useVehicle();
    const [localUser, setLocalUser] = useState<User | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);

    const fetchUserVehicles = async (userId: string) => {
        try {
            const vehiclesData = await vehicleService.getUserVehicles(userId);
            setUserVehicles(vehiclesData);
        } catch (error) {
            console.error('Failed to fetch user vehicles:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('DashboardPage: Fetching user data...');
                const userData = await authService.getCurrentUser();
                console.log('DashboardPage: User data fetched successfully:', userData);
                setLocalUser(userData);
                setFetchError(null);
                
                if (userData.id) {
                    await fetchUserVehicles(userData.id);
                }
            } catch (error) {
                console.error('DashboardPage: Failed to fetch user data:', error);
                setFetchError(error instanceof Error ? error.message : 'Failed to fetch user data');
            }
        };

        if (!contextUser && !isLoading) {
            fetchUserData();
        } else if (contextUser) {
            setLocalUser(contextUser);
            if (contextUser.id) {
                fetchUserVehicles(contextUser.id);
            }
        }
    }, [contextUser, isLoading]);

    const user = contextUser || localUser;
    
    const totalVehicles = userVehicles.length;
    const activeVehicles = userVehicles.filter(vehicle => 
        !vehicle.hasOwnProperty('status') || (vehicle as any).status === 'ATIVO'
    ).length;
    const inactiveVehicles = totalVehicles - activeVehicles;

    const handleRefresh = async () => {
        if (user?.id) {
            await fetchUserVehicles(user.id);
            await fetchVehicles(); 
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-grow ml-8">
                <UserMenu />
                
                <div className="mt-16">
                    {/* Loading */}
                    {(isLoading || (!user && !fetchError)) && (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <p className="text-gray-600">Carregando dados do usuário...</p>
                        </div>
                    )}

                    {/* Error */}
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

                    {/* Error Veículos */}
                    {vehiclesError && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                            <p className="text-yellow-700">Aviso: {vehiclesError}</p>
                        </div>
                    )}

                    {/* User Data Display */}
                    {user && (
                        <div className="space-y-4 p-5">
                            <div className="flex gap-5 items-center">
                                <div>
                                    <h1 className="text-4xl font-medium text-gray-800">
                                        Olá, {user.name},
                                    </h1>
                                    <h3 className="text-xl font-light text-gray-600">
                                        Cadastre e gerencie seus veículos.
                                    </h3>
                                </div>
                                <button
                                    onClick={handleRefresh}
                                    disabled={isVehiclesLoading}
                                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    <ImSpinner11 className="h-5 w-5 hover:animate-spin" />
                                    {isVehiclesLoading && (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    )}
                                </button>
                            </div>

                            {/* Estatísticas dos Veículos */}
                            {isVehiclesLoading ? (
                                <div className="flex items-center space-x-2 mt-8">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                    <p className="text-gray-600">Carregando estatísticas dos veículos...</p>
                                </div>
                            ) : (
                                <div className="flex gap-10 mt-8 flex-wrap">
                                    <StatusTotal
                                        icon={<IoFileTray className="text-2xl text-blue-500 h-8 w-8" />}
                                        name="Total"
                                        total={totalVehicles.toString()}
                                    />
                                    <StatusTotal
                                        icon={<FaCheck className="text-2xl text-green-500 h-8 w-8" />}
                                        name="Ativos"
                                        total={activeVehicles.toString()}
                                    />
                                    <StatusTotal
                                        icon={<FaUser className="text-2xl text-orange-500 h-8 w-8" />}
                                        name="Inativos"
                                        total={inactiveVehicles.toString()}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;