import { z } from 'zod';
import { VehicleType } from '@/types/vehicle';

export const vehicleSchema = z.object({
    name: z
        .string()
        .min(1, 'Nome do veículo é obrigatório')
        .max(50, 'O nome do veículo deve ter no máximo 50 caracteres'),
    plateNumber: z
        .string()
        .min(1, 'Placa é obrigatória')
        .max(7, 'A placa deve ter no máximo 7 caracteres'),
    year: z
        .number()
        .int('O ano deve ser um número inteiro')
        .min(1886, 'O ano deve ser maior ou igual a 1886')
        .max(new Date().getFullYear(), 'O ano não pode ser maior que o ano atual'),
    type: z
        .nativeEnum(VehicleType, {
            required_error: 'Tipo de veículo é obrigatório',
            invalid_type_error: 'Tipo de veículo deve ser um dos seguintes: CARRO, MOTO, CAMINHAO, ONIBUS, VAN'
        }),    
    color: z
        .string()
        .min(1, 'Cor é obrigatória')
        .max(30, 'A cor deve ter no máximo 30 caracteres'),
});

export type VehicleSchema = z.infer<typeof vehicleSchema>;

export const vehicleUpdateSchema = vehicleSchema.partial().extend({
    id: z.string().uuid('ID inválido'),
});
export type VehicleUpdateSchema = z.infer<typeof vehicleUpdateSchema>;