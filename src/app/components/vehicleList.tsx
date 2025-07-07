'use client';

import { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { Modal } from './modal';
import { VehicleForm } from './vehicleForm';
import { VehicleDetails } from './vehicleDetails';
import { FaEye } from 'react-icons/fa';
import { FaBoxArchive, FaGears, FaRegTrashCan } from 'react-icons/fa6';
import { RxReader } from 'react-icons/rx';
import { MdOutlineModeEdit } from 'react-icons/md';

interface VehicleListProps {
    vehicles: Vehicle[];
    onRefresh: () => void;
}

export const VehicleList = ({ vehicles, onRefresh }: VehicleListProps) => {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | null>(null);

    const handleViewVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setModalMode('view');
    };

    const handleEditVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setModalMode('edit');
    };

    const handleDeleteVehicle = (vehicle: Vehicle) => {
        // TODO: Implementar modal de confirmação de exclusão
        console.log('Delete vehicle:', vehicle.id);
    };

    const handleCloseModal = () => {
        setSelectedVehicle(null);
        setModalMode(null);
    };

    const handleSuccess = () => {
        setSelectedVehicle(null);
        setModalMode(null);
        onRefresh();
    };

    const getVehicleTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            'CARRO': 'Carro',
            'MOTO': 'Moto',
            'CAMINHAO': 'Caminhão',
            'ONIBUS': 'Ônibus',
            'VAN': 'Van'
        };
        return labels[type] || type;
    };

    if (vehicles.length === 0) {
        return (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Seus Veículos (0)
                </h3>
                
                {/* Tabela Vazia */}
                <div className="overflow-x-auto">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Veículo
                                </th>
                                <th className="px-6 py-3 border-b border-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 border-b border-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Placa
                                </th>
                                <th className="px-6 py-3 border-b border-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ano
                                </th>
                                <th className="px-6 py-3 border-b border-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cor
                                </th>
                                <th className="px-6 py-3 border-b border-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 border-b border-gray-400 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center border-b border-gray-400">
                                    <div className="text-gray-400 text-6xl mb-4">🚗</div>
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                                        Nenhum veículo encontrado
                                    </h3>
                                    <p className="text-gray-500">
                                        Cadastre seu primeiro veículo usando o botão acima.
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Seus Veículos ({vehicles.length})
            </h3>
            
            {/* Container da Tabela - Responsivo */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    {/* Cabeçalho da Tabela */}
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Veículo
                            </th>
                            <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Tipo
                            </th>
                            <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Placa
                            </th>
                            <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Ano
                            </th>
                            <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Cor
                            </th>
                            <th className="px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 border-b border-gray-300 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    
                    {/* Corpo da Tabela */}
                    <tbody className="divide-y divide-gray-200">
                        {vehicles.map((vehicle, index) => (
                            <tr
                                key={vehicle.id}
                                className={`${
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-gray-100 transition-colors`}
                            >
                                {/* Nome do Veículo */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm font-medium text-gray-900">
                                        {vehicle.name}
                                    </div>
                                </td>
                                
                                {/* Tipo do Veículo */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {getVehicleTypeLabel(vehicle.type)}
                                    </span>
                                </td>
                                
                                {/* Número da Placa */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm text-gray-900 font-mono font-semibold bg-gray-100 p-1 rounded-lg inline-block">
                                        {vehicle.plateNumber}
                                    </div>
                                </td>
                                
                                {/* Ano */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm text-gray-900">
                                        {vehicle.year}
                                    </div>
                                </td>
                                
                                {/* Cor */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm text-gray-900">
                                        {vehicle.color}
                                    </div>
                                </td>
                                
                                {/* Status */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                                        Ativo
                                    </span>
                                </td>
                                
                                {/* Ações */}
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleEditVehicle(vehicle)}
                                            className="p-2 text-black-600 bg-white shadow-sm hover:border-blue-300 rounded-lg transition-colors border border-gray-200"
                                            title="Editar"
                                        >
                                            <MdOutlineModeEdit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleViewVehicle(vehicle)}
                                            className="p-2 text-black-600 bg-white shadow-sm hover:border-blue-300 rounded-lg transition-colors border border-gray-200"
                                            title="Visualizar"
                                        >
                                            <FaBoxArchive className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteVehicle(vehicle)}
                                            className="p-2 text-red-600 bg-white shadow-sm hover:border-blue-300 rounded-lg transition-colors border border-gray-200"
                                            title="Excluir"
                                        >
                                            <FaRegTrashCan className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Visualização */}
            <Modal
                isOpen={modalMode === 'view'}
                onClose={handleCloseModal}
                icon={<RxReader className="color-gray-800 h-12 w-12 mt-[-4px]" />}
                title="Detalhes do Veículo"
                size="lg"
                transparent={true}
            >
                {selectedVehicle && (
                    <VehicleDetails
                        vehicle={selectedVehicle}
                        onClose={handleCloseModal}
                    />
                )}
            </Modal>

            {/* Modal de Edição */}
            <Modal
                isOpen={modalMode === 'edit'}
                onClose={handleCloseModal}
                icon={<FaGears className="color-gray-800 h-12 w-12 mt-[-4px]" />}
                title="Editar Veículo"
                size="lg"
                transparent={true}
            >
                {selectedVehicle && (
                    <VehicleForm
                        mode="edit"
                        initialData={selectedVehicle}
                        onSuccess={handleSuccess}
                        onCancel={handleCloseModal}
                    />
                )}
            </Modal>
        </div>
    );
};
