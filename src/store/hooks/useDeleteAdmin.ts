import { create } from "zustand";

interface DeleteAdminProps {
    isOpen: boolean;
    userId: string | null;
    onOpen: (userId: string) => void;
    onClose: () => void;
}

const useDeleteAdminModal = create<DeleteAdminProps>((set) => ({
    isOpen: false,
    userId: null,
    onOpen: (userId) => set({ isOpen: true, userId }),
    onClose: () => set({ isOpen: false, userId: null }),
}));

export default useDeleteAdminModal;
