'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
    isCollapsed: boolean;
    toggleSidebar: () => void;
    sidebarWidth: number;
    isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed by default
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024; // lg breakpoint
            setIsMobile(mobile);
            
            // On mobile, sidebar starts collapsed (hidden)
            // On desktop, sidebar starts expanded
            if (mobile) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };

        // Check on mount
        checkMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // On mobile, collapsed means hidden (0px), expanded means full sidebar (256px)
    // On desktop, collapsed means narrow (64px), expanded means full sidebar (256px)
    const sidebarWidth = isMobile 
        ? (isCollapsed ? 0 : 256)  // Mobile: hidden or full width
        : (isCollapsed ? 64 : 256); // Desktop: narrow or full width

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                toggleSidebar,
                sidebarWidth,
                isMobile,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
