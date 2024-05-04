import { create } from "zustand";

interface ActionsUserModalProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useActionsUserModal = create<ActionsUserModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useActionsUserModal;