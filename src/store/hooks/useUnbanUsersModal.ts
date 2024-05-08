import { create } from "zustand";
import { User } from '@/lib/definitions';

interface UnbanUsersModalProps {
    isOpen: boolean;
    user: User | null;
    onOpen: (user: User) => void;
    onClose: () => void;
}

const useUnbanUsersModal= create<UnbanUsersModalProps>((set) => ({
    isOpen: false,
    user: null,
    onOpen: (user) => set({isOpen: true, user}),
    onClose: () => set({isOpen: false, user: null}),
}));

export default useUnbanUsersModal;
