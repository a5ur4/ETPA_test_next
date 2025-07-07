export interface Vehicle {
    id: string;
    name: string;
    plateNumber: string;
    type: VehicleType;
    year: number;
    color: string;
    status?: 'ATIVO' | 'INATIVO';
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export enum VehicleType {
    CARRO = 'CARRO',
    MOTO = 'MOTO',
    CAMINHAO = 'CAMINHAO',
    ONIBUS = 'ONIBUS',
    VAN = 'VAN'
}

export interface CreateVehicleData {
    name: string;
    plateNumber: string;
    type: VehicleType;
    year: number;
    color: string;
}