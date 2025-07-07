'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVehicle } from '@/contexts/VehicleContext';
import { CreateVehicleData, VehicleType, Vehicle } from '@/types/vehicle';
import { vehicleSchema } from '@/schemas/vehicle.schema';

interface VehicleFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    mode?: 'create' | 'edit' | 'view' | 'delete' | 'patchStatus';
    initialData?: Vehicle;
}

export const VehicleForm = ({ 
    onSuccess, 
    onCancel, 
    mode = 'create',
    initialData 
}: VehicleFormProps) => {
    const { addVehicle, updateVehicle, deleteVehicle, patchVehicleStatus, isLoading, error, clearError } = useVehicle();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CreateVehicleData>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            plateNumber: initialData.plateNumber,
            type: initialData.type,
            year: initialData.year,
            color: initialData.color,
        } : {
            name: '',
            plateNumber: '',
            type: VehicleType.CARRO,
            year: new Date().getFullYear(),
            color: '',
        }
    });

    const isEditing = mode === 'edit';
    const isDeleting = mode === 'delete';
    const isPatchingStatus = mode === 'patchStatus';

    const onSubmit = async (data: CreateVehicleData) => {
        clearError();
        
        try {
            if (isEditing && initialData) {
                await updateVehicle({ ...initialData, ...data });
            } else {
                console.log(data);
                await addVehicle(data);
            }
            onSuccess?.();
        } catch (error) {
            console.error('Failed to save vehicle:', error);
        }
    };

    const handleDelete = async () => {
        if (!initialData?.id) return;
        
        clearError();
        try {
            await deleteVehicle(initialData.id);
            onSuccess?.();
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
        }
    };

    const handlePatchStatus = async (newStatus: 'ATIVO' | 'INATIVO') => {
        if (!initialData?.id) return;
        
        clearError();
        try {
            await patchVehicleStatus(initialData.id, newStatus);
            onSuccess?.();
        } catch (error) {
            console.error('Failed to update vehicle status:', error);
        }
    };

    const handleCancel = () => {
        reset();
        clearError();
        onCancel?.();
    };

    const getSubmitButtonText = () => {
        if (isSubmitting || isLoading) {
            if (isDeleting) return 'Excluindo...';
            return isEditing ? 'Atualizando...' : 'Cadastrando...';
        }
        if (isDeleting) return 'Confirmar Exclusão';
        return isEditing ? 'Atualizar Veículo' : 'Cadastrar Veículo';
    };

    const isFormReadOnly = mode === 'view' || mode === 'delete' || mode === 'patchStatus';

    return (
        <div className="space-y-4">
            {/* Delete Warning */}
            {isDeleting && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-red-600 text-sm font-bold">!</span>
                        </div>
                        <h3 className="text-red-800 font-semibold">Confirmar Exclusão</h3>
                    </div>
                    <p className="text-red-700 text-sm">
                        Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita.
                    </p>
                </div>
            )}

            {/* Patch Status Info */}
            {isPatchingStatus && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-blue-600 text-sm font-bold">i</span>
                        </div>
                        <h3 className="text-blue-800 font-semibold">Alterar Status do Veículo</h3>
                    </div>
                    <p className="text-blue-700 text-sm mb-4">
                        Status atual: <span className="font-semibold">{initialData?.status || 'ATIVO'}</span>
                    </p>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => handlePatchStatus('ATIVO')}
                            disabled={isLoading || initialData?.status === 'ATIVO'}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-bold rounded-lg focus:outline-none transition-colors"
                        >
                            {isLoading && initialData?.status !== 'ATIVO' && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                            )}
                            Ativar
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePatchStatus('INATIVO')}
                            disabled={isLoading || initialData?.status === 'INATIVO'}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg focus:outline-none transition-colors"
                        >
                            {isLoading && initialData?.status !== 'INATIVO' && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                            )}
                            Desativar
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-lg focus:outline-none transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={isDeleting ? undefined : handleSubmit(onSubmit)} className="space-y-4">
            {/* Exibição de Erro */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Nome do Veículo */}
            <div>
                <label htmlFor="name" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Nome do Veículo
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    disabled={isFormReadOnly}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                    } ${isFormReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    placeholder={isFormReadOnly ? '' : 'Ex: Honda Civic'}
                />
                {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Número da Placa */}
            <div>
                <label htmlFor="plateNumber" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Placa
                </label>
                <input
                    type="text"
                    id="plateNumber"
                    {...register('plateNumber')}
                    disabled={isFormReadOnly}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.plateNumber ? 'border-red-500' : 'border-gray-300'
                    } ${isFormReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    placeholder={isFormReadOnly ? '' : 'Ex: ABC1234'}
                    maxLength={7}
                />
                {errors.plateNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.plateNumber.message}</p>
                )}
            </div>

            {/* Tipo do Veículo */}
            <div>
                <label htmlFor="type" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Tipo de Veículo
                </label>
                <select
                    id="type"
                    {...register('type')}
                    disabled={isFormReadOnly}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.type ? 'border-red-500' : 'border-gray-300'
                    } ${isFormReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                >
                    <option value={VehicleType.CARRO}>Carro</option>
                    <option value={VehicleType.MOTO}>Moto</option>
                    <option value={VehicleType.CAMINHAO}>Caminhão</option>
                    <option value={VehicleType.ONIBUS}>Ônibus</option>
                    <option value={VehicleType.VAN}>Van</option>
                </select>
                {errors.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                )}
            </div>

            {/* Ano */}
            <div>
                <label htmlFor="year" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Ano
                </label>
                <input
                    type="number"
                    id="year"
                    {...register('year', { valueAsNumber: true })}
                    disabled={isFormReadOnly}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.year ? 'border-red-500' : 'border-gray-300'
                    } ${isFormReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    min={1886}
                    max={new Date().getFullYear()}
                />
                {errors.year && (
                    <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
                )}
            </div>

            {/* Cor */}
            <div>
                <label htmlFor="color" className="block text-gray-900 text-base font-semibold mb-1 ml-1">
                    Cor
                </label>
                <input
                    type="text"
                    id="color"
                    {...register('color')}
                    disabled={isFormReadOnly}
                    className={`w-full h-11 px-3 py-2 text-gray-900 rounded-xl focus:outline-none focus:ring focus:ring-blue-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] border border-gray-400 ${
                        errors.color ? 'border-red-500' : 'border-gray-300'
                    } ${isFormReadOnly ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    placeholder={isFormReadOnly ? '' : 'Ex: Branco'}
                />
                {errors.color && (
                    <p className="text-red-500 text-xs mt-1">{errors.color.message}</p>
                )}
            </div>

            {/* Ações do Formulário */}
            {!isFormReadOnly && (
                <div className="flex justify-center mb-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full mt-2 h-11 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold rounded-xl focus:outline-none transition-colors shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                    >
                        {(isSubmitting || isLoading) && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        )}
                        <span>{getSubmitButtonText()}</span>
                    </button>
                </div>
            )}

            {/* Ações de Exclusão */}
            {isDeleting && (
                <div className="flex gap-3 justify-center mb-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1 mt-2 h-11 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl focus:outline-none transition-colors shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="flex-1 mt-2 h-11 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-bold rounded-xl focus:outline-none transition-colors shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
                    >
                        {isLoading && (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        )}
                        <span>{getSubmitButtonText()}</span>
                    </button>
                </div>
            )}

            {/* Botão de fechar do modo exclusão */}
            {mode === 'view' && (
                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                        Fechar
                    </button>
                </div>
            )}
        </form>
        </div>
    );
};
