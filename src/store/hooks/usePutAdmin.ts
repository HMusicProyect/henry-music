import { create } from "zustand";

interface PutAdminProps {
    isOpen: boolean;
    userId: string | null;
    onOpen: (userId: string) => void;
    onClose: () => void;
}

const usePutAdminModal = create<PutAdminProps>((set) => ({
    isOpen: false,
    userId: null,
    onOpen: (userId) => set({ isOpen: true, userId }),
    onClose: () => set({ isOpen: false, userId: null }),
}));

export default usePutAdminModal;
