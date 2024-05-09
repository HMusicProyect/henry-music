import { create } from "zustand";

interface ActionsUserModalProps {
    isOpen: boolean;
    userId: string | null;
    isAdmin: boolean;
    onOpen: (userId: string, isAdmin: boolean) => void;
    onClose: () => void;
}

const useActionsUserModal = create<ActionsUserModalProps>((set) => ({
    isOpen: false,
    userId: null,
    isAdmin: false,
    onOpen: (userId, isAdmin) => set({ isOpen: true, userId, isAdmin }),
    onClose: () => set({ isOpen: false, userId: null, isAdmin: false }),
}));

export default useActionsUserModal;
