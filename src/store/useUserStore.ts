import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
    name: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
    login: (name: string, email: string, password: string) => void;
    logout: () => void;
};

const useUserStore = create(
    persist(
        (set) => ({
            name: '',
            email: '',
            password: '',
            isLoggedIn: false,
            login: (
                name: string, 
                email: string, 
                password: string
            ) => set({ name, email, password, isLoggedIn: true }),
            
            logout: () => set({ name: '', email: '', password: '', isLoggedIn: false }),
        }),
        {
            name: 'user-storage', // nombre único para el almacenamiento local
        }
    )
);

export default useUserStore;