import { create } from "zustand";

interface UploadSongModalStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUploadGenresModal = create<UploadSongModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useUploadGenresModal;