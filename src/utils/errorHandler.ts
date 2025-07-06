import { AxiosError } from 'axios';

export interface ApiErrorResponse {
    message: string;
    code?: string;
    details?: any;
}

export class ApiError extends Error {
    public statusCode: number;
    public code?: string;
    public details?: any;

    constructor(message: string, statusCode: number, code?: string, details?: any) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

export const handleApiError = (error: any): ApiError => {
    if (error instanceof AxiosError) {
        const status = error.response?.status || 500;
        const errorData = error.response?.data as ApiErrorResponse;
        
        return new ApiError(
            errorData?.message || error.message || 'An unexpected error occurred',
            status,
            errorData?.code,
            errorData?.details
        );
    }

    if (error instanceof ApiError) {
        return error;
    }

    return new ApiError(
        error.message || 'An unexpected error occurred',
        500
    );
};

export const getErrorMessage = (error: any): string => {
    const apiError = handleApiError(error);
    return apiError.message;
};
