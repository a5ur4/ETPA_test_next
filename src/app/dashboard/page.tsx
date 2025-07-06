'use client';

import { Sidebar } from "../components/dashboard/sidebar";
import { UserMenu } from "../components/dashboard/userMenu";

const DashboardPage = () => {

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-grow p-6">
                <UserMenu />
            </main>
        </div>
    );
};

export default DashboardPage;