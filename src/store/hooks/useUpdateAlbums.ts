import { create } from "zustand";


interface UpdateAlbumModalProps {
    isOpen: boolean;
    albumId: string | null;
    onOpen: (albumId: string) => void;
    onClose: () => void;
}

const useUpdateAlbumModal = create<UpdateAlbumModalProps>((set) => ({
    isOpen: false,
    albumId: null,
    onOpen: (albumId) => set({ isOpen: true, albumId }),
    onClose: () => set({ isOpen: false, albumId: null }),
}));

export default useUpdateAlbumModal;
