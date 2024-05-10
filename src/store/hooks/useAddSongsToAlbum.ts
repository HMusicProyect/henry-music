import { create } from "zustand";


interface AddSongsToAlbumModalProps{
    isOpen: boolean;
    id: string | null;
    onOpen: (id: string) => void;
    onClose: () => void;
}

const useAddSongsToAlbum = create<AddSongsToAlbumModalProps>((set) => ({
    isOpen: false,
    id: null,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: null }),
}))

export default useAddSongsToAlbum;