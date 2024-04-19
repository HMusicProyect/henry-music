"use client"

import { useState } from 'react';

type User = {
    photo: File | null;
    name: string;
    email: string;
    password: string;
};


const ProfilePage = () => {
    const [user, setUser] = useState<User>({
        photo: null,
        name: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setUser(prevUser => ({ ...prevUser, photo: file }));
        }
    };


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, name: event.target.value }));
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, email: event.target.value }));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, password: event.target.value }));
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Lógica para enviar los datos actualizados al servidor
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-5">Perfil de Usuario</h1>
            <div className="w-24 h-24 mb-4 relative">
                <div className="bg-gray-500 opacity-50 absolute inset-0 rounded"></div>
                <img 
                    className="rounded-full w-full h-full object-cover absolute inset-0" 
                    src={user.photo || '/images/img-perfil-padron.jpg'} 
                    alt="Foto de perfil" 
                />
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                        Foto:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="file" 
                        id="photo" 
                        onChange={handlePhotoChange} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre:
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" 
                        id="name" 
                        value={user.name} 
                        onChange={handleNameChange} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email" 
                        id="email" 
                        value={user.email} 
                        onChange={handleEmailChange} 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña:
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password" 
                        id="password" 
                        value={user.password} 
                        onChange={handlePasswordChange} 
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirmar Contraseña:
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;