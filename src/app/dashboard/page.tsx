'use client';

import { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { UserMenu } from "../components/userMenu";
import { useAuth } from "@/contexts/AuthContext";
import { useVehicle } from "@/contexts/VehicleContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { authService } from "@/services/auth.service";
import { vehicleService } from "@/services/vehicle.service";
import { User } from "@/types/user";
import { Vehicle } from "@/types/vehicle";
import { StatusTotal } from "../components/statusTotal";
import { IoFileTray } from "react-icons/io5";
import { FaCheck, FaUser } from "react-icons/fa";
import { ImSpinner11 } from "react-icons/im";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Modal } from "../components/modal";
import { VehicleForm } from "../components/vehicleForm";
import { VehicleList } from "../components/vehicleList";
import { LuCar } from "react-icons/lu";

const DashboardPage = () => {
    const { user: contextUser, isLoading } = useAuth();
    const { vehicles, isLoading: isVehiclesLoading, error: vehiclesError, fetchVehicles } = useVehicle();
    const { sidebarWidth } = useSidebar();
    const [localUser, setLocalUser] = useState<User | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleVehicleCreated = () => {
        setIsModalOpen(false);
        // Atualizar a lista de veículos do usuário após criação bem-sucedida
        if (user?.id) {
            fetchUserVehicles(user.id);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main 
                className="flex-grow transition-all duration-300 ease-in-out"
                style={{ marginLeft: `${sidebarWidth}px` }}
            >
                <UserMenu />
                
                <div className="mt-16">
                    {/* Carregando */}
                    {(isLoading || (!user && !fetchError)) && (
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                            <p className="text-gray-600">Carregando dados do usuário...</p>
                        </div>
                    )}

                    {/* Erro */}
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

                    {/* Exibição de Dados do Usuário */}
                    {user && (
                        <div className="space-y-4 p-5">
                            <div className="flex gap-5 items-center">
                                <div>
                                    <h1 className="text-4xl font-medium text-gray-800">
                                        Olá, {user.name},
                                    </h1>
                                    <h3 className="text-xl font-light text-gray-600 mt-4">
                                        Cadastre e gerencie seus veículos.
                                    </h3>
                                </div>
                            </div>

                            {/* Estatísticas dos Veículos */}
                            {isVehiclesLoading ? (
                                <div className="flex items-center space-x-2 mt-8">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                    <p className="text-gray-600">Carregando estatísticas dos veículos...</p>
                                </div>
                            ) : (
                                <div className="flex gap-10 mt-10 flex-wrap">
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
                            {/* Adicionar Veículo */}
                            <div className="flex items-center mt-8 space-x-4">
                            <button 
                                onClick={handleOpenModal}
                                className="flex items-center py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                            >
                                <IoIosAddCircleOutline className="inline-block mr-2 h-5 w-5" />
                                <span className="font-semibold text-sm">
                                    Cadastrar Veículo
                                </span>
                            </button>
                            <button
                                onClick={handleRefresh}
                                disabled={isVehiclesLoading}
                                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                <ImSpinner11 className="h-3 w-3 hover:animate-spin" />
                                {isVehiclesLoading && (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                )}
                            </button>
                            </div>

                            {/* Lista de Veículos */}
                            <div className="mt-8">
                                <VehicleList 
                                    vehicles={userVehicles}
                                    onRefresh={() => user?.id && fetchUserVehicles(user.id)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal para Formulário de Veículo */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                icon={<LuCar className="color-gray-800 h-12 w-12 mt-[-4px]" />}
                title="Criar Veículo"
                size="lg"
                transparent={true}
            >
                <VehicleForm
                    onSuccess={handleVehicleCreated}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default DashboardPage;