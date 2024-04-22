// UserInfo.tsx
import Image from 'next/image';
import { User } from '@/lib/definitions';

type UserInfoProps = {
    user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
    console.log('User:', user);
    return(
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
            <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Perfil de Usuario</h1>
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-start flex-col justify-start">
                    <label className="text-sm text-gray-700 dark:text-gray-200 mr-2" htmlFor="name">
                        Nombre:
                    </label>
                    <p className="w-full px-3 text-gray-700 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {user?.name}
                    </p>
                </div>
                <div className="flex items-start flex-col justify-start">
                    <label className="text-sm text-gray-700 dark:text-gray-200 mr-2" htmlFor="email">
                        Email:
                    </label>
                    <p className="w-full px-3 text-gray-700 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        {user?.email}
                    </p>
                </div>
                <div className="min-h-[100px]"></div> {/* Añade un espacio vacío para que UserInfo tenga el mismo tamaño que UserForm */}
            </div>
        </div>
    )
};