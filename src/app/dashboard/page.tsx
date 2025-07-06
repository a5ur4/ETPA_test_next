'use client';

const DashboardPage = () => {

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-blue-600 font-bold text-2xl">EPTA</h1>
                    <p className="text-gray-500 text-sm">Tecnologia</p>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <a 
                                href="/dashboard" 
                                className="flex items-center p-3 text-gray-700 bg-blue-50 border-r-4 border-blue-500 rounded-lg font-medium"
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="flex items-center p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                            >
                                Veículos
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="flex items-center p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                            >
                                Relatórios
                            </a>
                        </li>
                        <li>
                            <a 
                                href="#" 
                                className="flex items-center p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
                            >
                                Configurações
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            <main className="flex-grow p-6">
                {/* Aqui você pode incluir o conteúdo do dashboard */}
                <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Dashboard</h2>
                {/* Outros componentes do dashboard podem ser incluídos aqui */}
            </main>
        </div>
    );
};

export default DashboardPage;