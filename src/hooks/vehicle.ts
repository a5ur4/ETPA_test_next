import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useVehicle } from '@/contexts/VehicleContext';
import { CreateVehicleData, Vehicle } from '@/types/vehicle';

export const useVehicleOperations = () => {
    const router = useRouter();
    const {
        vehicles,
        isLoading,
        error,
        fetchVehicles,
        getVehicleById,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        clearError,
    } = useVehicle();

    const handleCreateVehicle = useCallback(async (vehicleData: CreateVehicleData) => {
        try {
            await addVehicle(vehicleData);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }, [addVehicle]);

    const handleUpdateVehicle = useCallback(async (vehicleData: Vehicle) => {
        try {
            await updateVehicle(vehicleData);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }, [updateVehicle]);

    const handleDeleteVehicle = useCallback(async (id: string) => {
        try {
            await deleteVehicle(id);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }, [deleteVehicle]);

    const handleGetVehicle = useCallback(async (id: string) => {
        try {
            const vehicle = await getVehicleById(id);
            return { success: true, data: vehicle };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }, [getVehicleById]);

    const refreshVehicles = useCallback(async () => {
        try {
            await fetchVehicles();
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }, [fetchVehicles]);

    return {
        vehicles,
        isLoading,
        error,
        clearError,
        handleCreateVehicle,
        handleUpdateVehicle,
        handleDeleteVehicle,
        handleGetVehicle,
        refreshVehicles,
    };
};