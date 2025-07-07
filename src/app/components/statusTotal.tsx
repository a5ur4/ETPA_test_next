interface StatusTotalProps {
    icon: React.ReactElement;
    name: string;
    total: string | number;
}

export const StatusTotal = ({ icon, name, total }: StatusTotalProps) => {
    return (
        <div className="flex p-3 sm:p-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors w-full min-w-0">
            <span className="mr-2 sm:mr-3 bg-gray-100 p-2 sm:p-3 rounded-full flex items-center justify-center flex-shrink-0">
                {icon}
            </span>
            <div className="flex flex-col items-start justify-center min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-medium text-gray-500 truncate w-full">{name}</span>
                <span className="text-gray-800 text-xl sm:text-2xl lg:text-3xl font-bold truncate w-full">{total}</span>
            </div>
        </div>
    );
};