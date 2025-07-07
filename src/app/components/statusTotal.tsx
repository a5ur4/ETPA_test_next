interface StatusTotalProps {
    icon: React.ReactElement;
    name: string;
    total: string | number;
}

export const StatusTotal = ({ icon, name, total }: StatusTotalProps) => {
    return (
        <div className="flex p-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors w-3xs">
            <span className="mr-2 bg-gray-100 p-3 rounded-full flex items-center justify-center">{icon}</span>
            <div className="flex flex-col items-start ml-3">
                <span className="text-sm font-medium text-gray-500">{name}</span>
                <span className=" text-gray-800 text-3xl font-bold">{total}</span>
            </div>
        </div>
    );
};