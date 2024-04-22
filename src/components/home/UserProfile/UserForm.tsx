// UserForm.tsx
import { User } from '@/lib/definitions';

type UserFormProps = {
    user: User;
    onUserChange: (user: User) => void;
    onSubmit: (event: React.FormEvent) => Promise<void>;
    handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UserForm: React.FC<UserFormProps> = ({
    user,
    onSubmit,
    handlePhotoChange,
    handleNameChange,
    handleEmailChange,
}) => (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Perfil de Usuario</h1>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2" htmlFor="photo">
                    Foto:
                </label>
                <input
                    className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    type="file" 
                    id="photo" 
                    onChange={handlePhotoChange} 
                />
            </div>
            <div className="flex items-start flex-col justify-start">
                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2" htmlFor="name">
                    Nombre:
                </label>
                <input 
                    className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    type="text" 
                    id="name" 
                    value={user?.name} 
                    onChange={handleNameChange} 
                />
            </div>
            <div className="flex items-start flex-col justify-start">
                <label className="text-sm text-gray-700 dark:text-gray-200 mr-2" htmlFor="email">
                    Email:
                </label>
                <input 
                    className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    type="email" 
                    id="email" 
                    value={user?.email} 
                    onChange={handleEmailChange} 
                />
            </div>
            <button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                type="submit"
            >
                Guardar Cambios
            </button>
        </form>
    </div>
);