import { create } from "zustand";

interface EditSongsToPlaylistStore{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditSongsToPlaylist = create<EditSongsToPlaylistStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useEditSongsToPlaylist;