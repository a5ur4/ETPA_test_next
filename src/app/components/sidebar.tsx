'use client';

import { RiDashboardFill } from "react-icons/ri";
import { IoFileTray } from "react-icons/io5";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSidebar } from '@/contexts/SidebarContext';

import logoEPTA from '@/assets/logo_EPTA.png';
import logoEPTAsmall from '@/assets/logo_EPTA_small.png'

export const Sidebar = () => {
    const pathname = usePathname();
    const { isCollapsed, toggleSidebar, isMobile } = useSidebar();

    const navigationItems = [
        {
            href: '/dashboard',
            icon: RiDashboardFill,
            label: 'Dashboard'
        },
        {
            href: '/dashboard/reports',
            icon: IoFileTray,
            label: 'Relatórios'
        }
    ];

    return (
        <>
            {/* Overlay for mobile when sidebar is open */}
            {isMobile && !isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}
            
            <aside className={`${
                isMobile 
                    ? (isCollapsed ? '-translate-x-full' : 'translate-x-0 w-64')
                    : (isCollapsed ? 'w-16' : 'w-64')
            } bg-white shadow-xl/20 top-0 left-0 h-full z-50 fixed transition-all duration-300 ease-in-out`}>
                {/* Botão de Alternância Desktop */}
                {!isMobile && (
                    <div className="absolute -right-4 top-6 z-10">
                        <button
                            onClick={toggleSidebar}
                            className="bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-shadow duration-200"
                            title={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
                        >
                            {isCollapsed ? (
                                <HiMenuAlt2 className="w-4 h-4 text-gray-600" />
                            ) : (
                                <HiX className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                    </div>
                )}

                {/* Botão de Menu Mobile */}
                {isMobile && (
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={toggleSidebar}
                            className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
                            title="Fechar menu"
                        >
                            <HiX className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                )}

            {/* Seção do Logo */}
            <div className={`${(isCollapsed && !isMobile) ? 'p-4' : 'p-6 sm:p-8'} transition-all duration-300 ${isMobile ? 'pt-16' : ''}`}>
                {(isCollapsed && !isMobile) ? (
                    <Image src={logoEPTAsmall} alt="Logo EPTA" className="w-8 h-auto mx-auto" />
                ) : (
                    <Image src={logoEPTA} alt="Logo EPTA" className="w-24 sm:w-32 h-auto" />
                )}
            </div>

            {/* Navegação */}
            <nav className={`${(isCollapsed && !isMobile) ? 'p-2' : 'p-4'} ${(isCollapsed && !isMobile) ? 'mt-0' : 'mt-[-20px]'} transition-all duration-300`}>
                {(!isCollapsed || isMobile) && (
                    <h2 className="text-base sm:text-lg mb-4 ml-4 font-normal text-gray-700">Navegação</h2>
                )}
                <ul>
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        
                        return (
                            <li key={item.href} className="mb-2">
                                <Link 
                                    href={item.href} 
                                    className={`flex items-center ${(isCollapsed && !isMobile) ? 'p-3 justify-center' : 'p-2'} rounded-lg transition-colors group relative ${
                                        isActive 
                                            ? 'text-blue-500 bg-gray-100' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                                    }`}
                                    title={(isCollapsed && !isMobile) ? item.label : ''}
                                    onClick={isMobile ? toggleSidebar : undefined}
                                >
                                    <Icon className={`w-5 h-5 ${(isCollapsed && !isMobile) ? '' : 'mr-3 ml-3'}`} /> 
                                    {(!isCollapsed || isMobile) && item.label}
                                    
                                    {/* Tooltip para estado recolhido no desktop */}
                                    {(isCollapsed && !isMobile) && (
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                                            {item.label}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
        </>
    );
};