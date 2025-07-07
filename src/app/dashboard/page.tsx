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
import { HiMenuAlt2 } from "react-icons/hi";
import { Modal } from "../components/modal";
import { VehicleForm } from "../components/vehicleForm";
import { VehicleList } from "../components/vehicleList";
import { LuCar } from "react-icons/lu";

const DashboardPage = () => {
    const { user: contextUser, isLoading } = useAuth();
    const { vehicles, isLoading: isVehiclesLoading, error: vehiclesError, fetchVehicles } = useVehicle();
    const { sidebarWidth, toggleSidebar } = useSidebar();
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
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main 
                className="flex-grow transition-all duration-300 ease-in-out overflow-y-auto"
                style={{ marginLeft: `${sidebarWidth}px` }}
            >
                {/* Mobile Menu Button */}
                <div className="lg:hidden fixed top-4 left-4 z-30">
                    <button
                        onClick={toggleSidebar}
                        className="bg-white border border-gray-200 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow duration-200"
                        title="Abrir menu"
                    >
                        <HiMenuAlt2 className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                
                <UserMenu />
                
                <div className="mt-14 sm:mt-16 px-3 sm:px-6 lg:px-8">
                    {/* Carregando */}
                    {(isLoading || (!user && !fetchError)) && (
                        <div className="flex items-center justify-center space-x-2 py-6 sm:py-8">
                            <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
                            <p className="text-gray-600 text-sm sm:text-base">Carregando dados do usuário...</p>
                        </div>
                    )}

                    {/* Erro */}
                    {fetchError && !user && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                            <p className="text-red-700 text-sm sm:text-base">Erro ao carregar dados: {fetchError}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-2 text-red-600 hover:text-red-800 underline text-sm sm:text-base"
                            >
                                Tentar novamente
                            </button>
                        </div>
                    )}

                    {/* Error Veículos */}
                    {vehiclesError && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4">
                            <p className="text-yellow-700 text-sm sm:text-base">Aviso: {vehiclesError}</p>
                        </div>
                    )}

                    {/* Exibição de Dados do Usuário */}
                    {user && (
                        <div className="space-y-4 sm:space-y-6 pb-6 sm:pb-8">
                            <div className="flex flex-col gap-3 sm:gap-4 items-start">
                                <div className="w-full">
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-800 leading-tight">
                                        Olá, {user.name},
                                    </h1>
                                    <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-light text-gray-600 mt-1 sm:mt-2 lg:mt-4">
                                        Cadastre e gerencie seus veículos.
                                    </h3>
                                </div>
                            </div>

                            {/* Estatísticas dos Veículos */}
                            {isVehiclesLoading ? (
                                <div className="flex items-center justify-center space-x-2 py-4 sm:py-6">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                    <p className="text-gray-600 text-sm sm:text-base">Carregando estatísticas dos veículos...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-10">
                                    <StatusTotal
                                        icon={<IoFileTray className="text-blue-500 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />}
                                        name="Total"
                                        total={totalVehicles.toString()}
                                    />
                                    <StatusTotal
                                        icon={<FaCheck className="text-green-500 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />}
                                        name="Ativos"
                                        total={activeVehicles.toString()}
                                    />
                                    <StatusTotal
                                        icon={<FaUser className="text-orange-500 h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />}
                                        name="Inativos"
                                        total={inactiveVehicles.toString()}
                                    />
                                </div>
                            )}
                            
                            {/* Adicionar Veículo */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                                <button 
                                    onClick={handleOpenModal}
                                    className="flex items-center justify-center py-3 px-4 sm:py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors w-full sm:w-auto order-1 sm:order-1"
                                >
                                    <IoIosAddCircleOutline className="inline-block mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="font-semibold text-sm">
                                        Cadastrar Veículo
                                    </span>
                                </button>
                                <button
                                    onClick={handleRefresh}
                                    disabled={isVehiclesLoading}
                                    className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors w-full sm:w-auto order-2 sm:order-2"
                                >
                                    <ImSpinner11 className="h-3 w-3 hover:animate-spin" />
                                    {isVehiclesLoading && (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    )}
                                    <span className="sm:hidden text-sm font-semibold">Atualizar</span>
                                </button>
                            </div>

                            {/* Lista de Veículos */}
                            <div className="w-full">
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