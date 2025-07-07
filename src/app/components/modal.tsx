import { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';

export const Modal = ({
    isOpen,
    onClose,
    icon,
    title,
    children,
    size = "md",
    transparent = false,
}: {
    isOpen: boolean;
    onClose: () => void;
    icon: React.ReactElement;
    title: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    transparent?: boolean;
}) => {
    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: "max-w-sm",
        md: "max-w-md", 
        lg: "max-w-lg",
        xl: "max-w-xl"
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalClasses = transparent
        ? "bg-white bg-opacity-95 backdrop-blur-md border border-gray-200 shadow-2xl"
        : "bg-white shadow-lg";

    return (
        <div 
            className={`fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50`}
            onClick={handleBackdropClick}
        >
            <div className={`${modalClasses} rounded-3xl p-6 w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}>
                <button
                        onClick={onClose}
                        className="text-gray-900 hover:text-red-600 transition-colors duration-200 text-2xl font-light top-4 right-4 absolute"
                        aria-label="Fechar modal"
                    >
                        <IoIosClose className="h-8 w-8" />
                </button>
                <div className="flex items-center justify-center space-x-3 mt-6 mb-6">
                    {icon}
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                </div>
                <div className="overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};