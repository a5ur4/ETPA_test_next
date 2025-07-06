'use client';

import { RiDashboardFill } from "react-icons/ri";
import { IoFileTray } from "react-icons/io5";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import logoEPTA from '@/assets/logo_EPTA.png';

export const Sidebar = () => {
    const pathname = usePathname();

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
    <aside className="w-64 bg-white shadow-xl/20">
        <div className="p-8">
            <Image src={logoEPTA} alt="Logo EPTA" className="w-32 h-auto" />
        </div>
            <nav className="p-4 mt-[-20px]">
                <h2 className="text-lg mb-4 ml-4 font-thin text-gray-700">Navegação</h2>
                <ul>
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        
                        return (
                            <li key={item.href} className="mb-2">
                                <Link 
                                    href={item.href} 
                                    className={`flex items-center p-2 rounded-4xl transition-colors ${
                                        isActive 
                                            ? 'text-blue-500 bg-gray-100' 
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                                    }`}
                                >
                                    <Icon className="w-5 h-5 mr-3 ml-3" /> 
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};