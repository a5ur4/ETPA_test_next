'use client';

import { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { Modal } from './modal';
import { VehicleForm } from './vehicleForm';
import { VehicleDetails } from './vehicleDetails';
import { FaBoxArchive, FaGears, FaRegTrashCan } from 'react-icons/fa6';
import { RxReader } from 'react-icons/rx';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaPowerOff } from 'react-icons/fa';

interface VehicleListProps {
    vehicles: Vehicle[];
    onRefresh: () => void;
}

export const VehicleList = ({ vehicles, onRefresh }: VehicleListProps) => {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'delete' | 'patchStatus' | null>(null);

    const handleViewVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setModalMode('view');
    };

    const handleEditVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setModalMode('edit');
    };

    const handlePatchStatusVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setModalMode('patchStatus');
    };

    const handleDeleteVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setModalMode('delete');
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
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                    Seus Veículos (0)
                </h3>
                
                {/* Empty State Card - Always visible */}
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                    <div className="text-gray-400 text-4xl sm:text-6xl mb-4">🚗</div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                        Nenhum veículo encontrado
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                        Cadastre seu primeiro veículo usando o botão acima.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Seus Veículos ({vehicles.length})
            </h3>
            
            {/* Mobile Card View - Hidden on md+ */}
            <div className="md:hidden space-y-4">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-sm">{vehicle.name}</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {getVehicleTypeLabel(vehicle.type)}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                                        vehicle.status === 'ATIVO' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-orange-100 text-orange-800'
                                    }`}>
                                        <span className={`w-2 h-2 rounded-full mr-1 ${
                                            vehicle.status === 'ATIVO' 
                                                ? 'bg-green-400' 
                                                : 'bg-orange-400'
                                        }`}></span>
                                        {vehicle.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                            <div>
                                <span className="text-gray-500 block">Placa:</span>
                                <span className="font-mono font-semibold bg-gray-100 px-2 py-1 rounded text-xs">
                                    {vehicle.plateNumber}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500 block">Ano:</span>
                                <span className="text-gray-900">{vehicle.year}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 block">Cor:</span>
                                <span className="text-gray-900">{vehicle.color}</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleEditVehicle(vehicle)}
                                className="flex-1 min-w-0 p-2 text-black-600 bg-white shadow-sm hover:border-blue-300 rounded-lg transition-colors border border-gray-200 flex items-center justify-center"
                                title="Editar"
                            >
                                <MdOutlineModeEdit className="w-4 h-4 mr-1" />
                                <span className="text-xs">Editar</span>
                            </button>
                            <button
                                onClick={() => handleViewVehicle(vehicle)}
                                className="flex-1 min-w-0 p-2 text-black-600 bg-white shadow-sm hover:border-blue-300 rounded-lg transition-colors border border-gray-200 flex items-center justify-center"
                                title="Visualizar"
                            >
                                <FaBoxArchive className="w-4 h-4 mr-1" />
                                <span className="text-xs">Ver</span>
                            </button>
                            <button
                                onClick={() => handlePatchStatusVehicle(vehicle)}
                                className="flex-1 min-w-0 p-2 text-black-600 bg-white shadow-sm hover:border-blue-300 rounded-lg transition-colors border border-gray-200 flex items-center justify-center"
                                title="Alterar Status"
                            >
                                <FaPowerOff className="w-4 h-4 mr-1" />
                                <span className="text-xs">Status</span>
                            </button>
                            <button
                                onClick={() => handleDeleteVehicle(vehicle)}
                                className="flex-1 min-w-0 p-2 text-red-600 bg-white shadow-sm hover:border-red-300 rounded-lg transition-colors border border-gray-200 flex items-center justify-center"
                                title="Excluir"
                            >
                                <FaRegTrashCan className="w-4 h-4 mr-1" />
                                <span className="text-xs">Excluir</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View - Hidden on mobile */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                    {/* Cabeçalho da Tabela */}
                    <thead>
                        <tr>
                            <th className="px-4 lg:px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Veículo
                            </th>
                            <th className="px-4 lg:px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Tipo
                            </th>
                            <th className="px-4 lg:px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Placa
                            </th>
                            <th className="px-4 lg:px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Ano
                            </th>
                            <th className="px-4 lg:px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Cor
                            </th>
                            <th className="px-4 lg:px-6 py-3 border-b border-gray-300 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 lg:px-6 py-3 border-b border-gray-300 text-center text-xs font-medium text-gray-800 uppercase tracking-wider">
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
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm font-medium text-gray-900">
                                        {vehicle.name}
                                    </div>
                                </td>
                                
                                {/* Tipo do Veículo */}
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {getVehicleTypeLabel(vehicle.type)}
                                    </span>
                                </td>
                                
                                {/* Número da Placa */}
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm text-gray-900 font-mono font-semibold bg-gray-100 p-1 rounded-lg inline-block">
                                        {vehicle.plateNumber}
                                    </div>
                                </td>
                                
                                {/* Ano */}
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm text-gray-900">
                                        {vehicle.year}
                                    </div>
                                </td>
                                
                                {/* Cor */}
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <div className="text-sm text-gray-900">
                                        {vehicle.color}
                                    </div>
                                </td>
                                
                                {/* Status */}
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                                        vehicle.status === 'ATIVO' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-orange-100 text-orange-800'
                                    }`}>
                                        <span className={`w-2 h-2 rounded-full mr-1 ${
                                            vehicle.status === 'ATIVO' 
                                                ? 'bg-green-400' 
                                                : 'bg-orange-400'
                                        }`}></span>
                                        {vehicle.status === 'ATIVO' ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                
                                
                                {/* Ações */}
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap border-b border-gray-200 text-center">
                                    <div className="flex justify-center space-x-1 lg:space-x-2">
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
                                            onClick={() => handlePatchStatusVehicle(vehicle)}
                                            className="p-2 text-black-600 bg-white shadow-sm hover:border-blue-300 rounded-lg transition-colors border border-gray-200"
                                            title="Alterar Status"
                                        >
                                            <FaPowerOff className="w-4 h-4" />
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

            {/* Patch Status Modal */}
            <Modal
                isOpen={modalMode === 'patchStatus'}
                onClose={handleCloseModal}
                icon={<FaGears className="color-gray-800 h-12 w-12 mt-[-4px]" />}
                title="Alterar Status do Veículo"
                size="lg"
                transparent={true}
            >
                {selectedVehicle && (
                    <VehicleForm
                        mode="patchStatus"
                        initialData={selectedVehicle}
                        onSuccess={handleSuccess}
                        onCancel={handleCloseModal}
                    />
                )}
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={modalMode === 'delete'}
                onClose={handleCloseModal}
                icon={<FaRegTrashCan className="color-red-600 h-12 w-12 mt-[-4px]" />}
                title="Excluir Veículo"
                size="lg"
                transparent={true}
            >
                {selectedVehicle && (
                    <VehicleForm
                        mode="delete"
                        initialData={selectedVehicle}
                        onSuccess={handleSuccess}
                        onCancel={handleCloseModal}
                    />
                )}
            </Modal>
        </div>
    );
};
