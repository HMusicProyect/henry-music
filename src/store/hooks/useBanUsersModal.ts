import { create } from "zustand";
import { User } from '@/lib/definitions';

interface BanUsersModalProps {
    isOpen: boolean;
    user: User | null;
    onOpen: (user: User) => void;
    onClose: () => void;
}

const useBanUsersModal = create<BanUsersModalProps>((set) => ({
    isOpen: false,
    user: null,
    onOpen: (user) => set({isOpen: true, user}),
    onClose: () => set({isOpen: false, user: null}),
}));

export default useBanUsersModal;
