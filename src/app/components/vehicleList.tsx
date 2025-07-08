'use client';

import { useState, useMemo, useEffect } from 'react';
import { Vehicle } from '@/types/vehicle';
import { Modal } from './modal';
import { VehicleForm } from './vehicleForm';
import { VehicleDetails } from './vehicleDetails';
import { FaBoxArchive, FaGears, FaRegTrashCan } from 'react-icons/fa6';
import { RxReader } from 'react-icons/rx';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FaPowerOff, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface VehicleListProps {
    vehicles: Vehicle[];
    onRefresh: () => void;
}

export const VehicleList = ({ vehicles, onRefresh }: VehicleListProps) => {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [modalMode, setModalMode] = useState<'view' | 'edit' | 'delete' | 'patchStatus' | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'ATIVO' | 'INATIVO'>('all');
    const [typeFilter, setTypeFilter] = useState<'all' | 'CARRO' | 'MOTO' | 'CAMINHAO' | 'ONIBUS' | 'VAN'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const filteredVehicles = useMemo(() => {
        return vehicles.filter(vehicle => {
            const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                vehicle.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                vehicle.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                vehicle.year.toString().includes(searchTerm);
            
            const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
            const matchesType = typeFilter === 'all' || vehicle.type === typeFilter;
            
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [vehicles, searchTerm, statusFilter, typeFilter]);

    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, typeFilter]);

    const handleFilterChange = () => {
    
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Seus Veículos ({filteredVehicles.length} de {vehicles.length})
                </h3>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4 mt-4 mb-6">
                {/* Search Bar */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, placa, cor ou ano..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            handleFilterChange();
                        }}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value as any);
                                handleFilterChange();
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="all">Todos os Status</option>
                            <option value="ATIVO">Ativo</option>
                            <option value="INATIVO">Inativo</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Tipo de Veículo
                        </label>
                        <select
                            value={typeFilter}
                            onChange={(e) => {
                                setTypeFilter(e.target.value as any);
                                handleFilterChange();
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        >
                            <option value="all">Todos os Tipos</option>
                            <option value="CARRO">Carro</option>
                            <option value="MOTO">Moto</option>
                            <option value="CAMINHAO">Caminhão</option>
                            <option value="ONIBUS">Ônibus</option>
                            <option value="VAN">Van</option>
                        </select>
                    </div>

                    {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all') && (
                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                    setTypeFilter('all');
                                    setCurrentPage(1);
                                }}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                {filteredVehicles.length === 0 && vehicles.length > 0 && (
                    <div className="text-center py-4">
                        <p className="text-gray-500 text-sm">
                            Nenhum veículo encontrado com os filtros aplicados.
                        </p>
                    </div>
                )}
            </div>
            
            {/* Mobile Card View - Hidden on md+ */}
            {filteredVehicles.length > 0 && (
                <div className="md:hidden space-y-4">
                    {paginatedVehicles.map((vehicle) => (
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
            )}

            {/* Desktop Table View - Hidden on mobile */}
            {filteredVehicles.length > 0 && (
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
                        {paginatedVehicles.map((vehicle, index) => (
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
            )}

            {/* Pagination */}
            {filteredVehicles.length > itemsPerPage && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-700">
                        Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredVehicles.length)} de {filteredVehicles.length} veículos
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Página anterior"
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <div className="flex space-x-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNumber;
                                if (totalPages <= 5) {
                                    pageNumber = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNumber = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNumber = totalPages - 4 + i;
                                } else {
                                    pageNumber = currentPage - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                                            currentPage === pageNumber
                                                ? 'bg-blue-500 text-white'
                                                : 'border border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>
                        
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Próxima página"
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

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
