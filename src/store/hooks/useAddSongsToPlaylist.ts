import { create } from "zustand";


interface AddSongsToPlaylistModalStore {
    isOpen: boolean;
    id: string | null;
    onOpen: (id: string) => void;
    onClose: () => void;
}

const useAddSongsToPlaylistModal = create<AddSongsToPlaylistModalStore>((set) => ({
    isOpen: false,
    id: null,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: null }),
}));

export default useAddSongsToPlaylistModal;