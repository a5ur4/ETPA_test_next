import { api } from './api';
import { VehicleSchema, VehicleUpdateSchema } from '@/schemas/vehicle.schema';
import { handleApiError } from '@/utils/errorHandler';
import { Vehicle, CreateVehicleData } from '@/types/vehicle';

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface GetAllVehiclesApiResponse {
    success: boolean;
    message: string;
    data: Vehicle[];
}

export const vehicleService = {
    async createVehicle(vehicleData: CreateVehicleData): Promise<Vehicle> {
        try {
            const response = await api.post<ApiResponse<Vehicle>>('/vehicles', vehicleData);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to create vehicle');
            }
            return response.data.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    },

    async updateVehicle(vehicleData: VehicleUpdateSchema): Promise<Vehicle> {
        try {
            const { id, ...updateData } = vehicleData;
            const response = await api.put<ApiResponse<Vehicle>>(`/vehicles/${id}`, updateData);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update vehicle');
            }
            return response.data.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    },

    async patchVehicleStatus(id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<Vehicle> {
        try {
            const response = await api.patch<ApiResponse<Vehicle>>(`/vehicles/${id}/status`, { status });
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update vehicle status');
            }
            return response.data.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    },

    async deleteVehicle(id: string): Promise<void> {
        try {
            const response = await api.delete<ApiResponse<null>>(`/vehicles/${id}`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to delete vehicle');
            }
        } catch (error: any) {
            throw handleApiError(error);
        }
    },

    async getAllVehicles(): Promise<Vehicle[]> {
        try {
            const response = await api.get<GetAllVehiclesApiResponse>('/vehicles');
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch vehicles');
            }
            return response.data.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    },

    async getVehicleById(id: string): Promise<Vehicle> {
        try {
            const response = await api.get<ApiResponse<Vehicle>>(`/vehicles/${id}`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch vehicle');
            }
            return response.data.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    },

    async getUserVehicles(userId: string): Promise<Vehicle[]> {
        try {
            const response = await api.get<ApiResponse<Vehicle[]>>(`/vehicles/user/${userId}`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch user vehicles');
            }
            return response.data.data;
        } catch (error: any) {
            throw handleApiError(error);
        }
    }
};