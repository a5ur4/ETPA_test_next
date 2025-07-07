'use client';

import { Vehicle, VehicleType } from '@/types/vehicle';

interface VehicleDetailsProps {
    vehicle: Vehicle;
    onClose?: () => void;
}

export const VehicleDetails = ({ vehicle, onClose }: VehicleDetailsProps) => {
    const getVehicleTypeLabel = (type: VehicleType) => {
        const labels = {
            [VehicleType.CARRO]: 'Carro',
            [VehicleType.MOTO]: 'Moto', 
            [VehicleType.CAMINHAO]: 'Caminhão',
            [VehicleType.ONIBUS]: 'Ônibus',
            [VehicleType.VAN]: 'Van'
        };
        return labels[type] || type;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-6">
            {/* Grade de Informações do Veículo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Nome do Veículo
                        </label>
                        <p className="text-lg font-semibold text-gray-800">{vehicle.name}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Placa
                        </label>
                        <p className="text-lg font-mono font-semibold text-gray-800 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                            {vehicle.plateNumber}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Tipo
                        </label>
                        <p className="text-lg font-semibold text-gray-800">
                            {getVehicleTypeLabel(vehicle.type)}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Ano
                        </label>
                        <p className="text-lg font-semibold text-gray-800">{vehicle.year}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Cor
                        </label>
                        <p className="text-lg font-semibold text-gray-800">{vehicle.color}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Status
                        </label>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                            Ativo
                        </span>
                    </div>
                </div>
            </div>

            {/* Metadados */}
            <div className="border-t pt-4 space-y-2">
                <div className="text-sm text-gray-600">
                    <strong>Criado em:</strong> {formatDate(vehicle.createdAt)}
                </div>
                <div className="text-sm text-gray-600">
                    <strong>Última atualização:</strong> {formatDate(vehicle.updatedAt)}
                </div>
                <div className="text-sm text-gray-600">
                    <strong>ID:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{vehicle.id}</code>
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};
