// UserForm.tsx
import { UserWithPhoto } from '@/lib/definitions';
import Image from 'next/image';

type UserFormProps = {
    user: UserWithPhoto;
    onUserChange: (user: UserWithPhoto) => void;
    onSubmit: (event: React.FormEvent) => Promise<void>;
    handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    imageURL: string | null;
    // handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UserForm: React.FC<UserFormProps> = ({
    user,
    onSubmit,
    handlePhotoChange,
    handleNameChange,
    imageURL,
    // handleEmailChange,
}) => (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-10 py-10 flex flex-col items-center">
        <h1 
            className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8"
        >
            Perfil de Usuario
        </h1>
        <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
            <div className="text-center mt-12">
                <div className="flex items-center justify-center w-full">
                    <label 
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        htmlFor="dropzone-file" 
                    >
                        {imageURL && 
                        <Image
                            src={imageURL} 
                            alt="User" 
                            width={100} 
                            height={100} 
                        />}
                        
                        {imageURL == null && 
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                        }
                        <input 
                            id="dropzone-file" 
                            type="file" 
                            className="hidden"
                            onChange={handlePhotoChange}  
                        />
                    </label>
                </div>
                <div className="flex items-start flex-col justify-start">
                    <label 
                        className="text-sm text-gray-700 dark:text-gray-200 mr-2" 
                        htmlFor="name"
                    >
                        Nombre:
                    </label>
                    <input 
                        className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        
                        type="text" 
                        id="name" 
                        value={user.name} 
                        onChange={handleNameChange} 
                    />
                </div>
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