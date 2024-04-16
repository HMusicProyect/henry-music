"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useStore } from '@/store/user.store';

type User = {
    name: string;
    email: string;
    password: string;
};

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const postUser = useStore((state) => state.postUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: User = {
            name,
            email,
            password,
        };

        try {
        const response = await postUser(newUser);
        
        if (response && response.ok) { 
            router.push('/login'); 
        }
        } catch (error) {
            alert('Ocurrió un error al registrar el usuario.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
                <div className="flex justify-center items-center">
                <span className="text-gray-700 font-semibold text-2xl">Register Page</span>
                </div>
                <form className="mt-4" onSubmit={handleSubmit}>
                <label className="block">
                    <span className="text-gray-700 text-sm">Name:</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <label className="block mt-3">
                    <span className="text-gray-700 text-sm">Email:</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <label className="block mt-3">
                    <span className="text-gray-700 text-sm">Password:</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </label>
                <div className="mt-6">
                    <button type="submit" className="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500">Register</button>
                </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;