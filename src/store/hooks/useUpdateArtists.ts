import { create } from "zustand";


interface UpdateArtistsModalProps {
    isOpen: boolean;
    artistId: string | null;
    onOpen: (artistId: string) => void;
    onClose: () => void;
}

const useUpdateArtistsModal = create<UpdateArtistsModalProps>((set) => ({
    isOpen: false,
    artistId: null,
    onOpen: (artistId) => set({ isOpen: true, artistId }),
    onClose: () => set({ isOpen: false, artistId: null }),
}));

export default useUpdateArtistsModal;
