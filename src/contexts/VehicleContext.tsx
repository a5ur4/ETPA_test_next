'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { vehicleService } from '@/services/vehicle.service';
import { Vehicle, CreateVehicleData } from '@/types/vehicle';

interface VehicleContextType {
    vehicles: Vehicle[];
    isLoading: boolean;
    error: string | null;
    fetchVehicles: () => Promise<void>;
    getVehicleById: (id: string) => Promise<Vehicle>;
    addVehicle: (vehicleData: CreateVehicleData) => Promise<void>;
    updateVehicle: (vehicleData: Vehicle) => Promise<void>;
    deleteVehicle: (id: string) => Promise<void>;
    clearError: () => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

interface VehicleProviderProps {
    children: ReactNode;
}

export const VehicleProvider = ({ children }: VehicleProviderProps) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const clearError = () => setError(null);

    const fetchVehicles = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedVehicles = await vehicleService.getAllVehicles();
            setVehicles(fetchedVehicles);
        } catch (error: any) {
            console.error('Error fetching vehicles:', error);
            setError(error.message || 'Failed to fetch vehicles');
        } finally {
            setIsLoading(false);
        }
    };

    const getVehicleById = async (id: string): Promise<Vehicle> => {
        setIsLoading(true);
        setError(null);
        try {
            const vehicle = await vehicleService.getVehicleById(id);
            return vehicle;
        } catch (error: any) {
            console.error('Error fetching vehicle by ID:', error);
            setError(error.message || 'Failed to fetch vehicle');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const addVehicle = async (vehicleData: CreateVehicleData) => {
        setIsLoading(true);
        setError(null);
        try {
            const newVehicle = await vehicleService.createVehicle(vehicleData);
            setVehicles((prev) => [...prev, newVehicle]);
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Error adding vehicle:', error);
            setError(error.message || 'Failed to add vehicle');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateVehicle = async (vehicleData: Vehicle) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedVehicle = await vehicleService.updateVehicle(vehicleData);
            setVehicles((prev) =>
                prev.map((v) => (v.id === updatedVehicle.id ? updatedVehicle : v))
            );
        } catch (error: any) {
            console.error('Error updating vehicle:', error);
            setError(error.message || 'Failed to update vehicle');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteVehicle = async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await vehicleService.deleteVehicle(id);
            setVehicles((prev) => prev.filter((v) => v.id !== id));
        } catch (error: any) {
            console.error('Error deleting vehicle:', error);
            setError(error.message || 'Failed to delete vehicle');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <VehicleContext.Provider
            value={{ 
                vehicles, 
                isLoading, 
                error, 
                fetchVehicles, 
                getVehicleById, 
                addVehicle, 
                updateVehicle, 
                deleteVehicle, 
                clearError 
            }}
        >
            {children}
        </VehicleContext.Provider>
    );
};

export const useVehicle = () => {
    const context = useContext(VehicleContext);
    if (context === undefined) {
        throw new Error('useVehicle must be used within a VehicleProvider');
    }
    return context;
};