import { create } from 'zustand';

export interface Album {
    id: number;
    name: string;
    image: string;
}

export interface State {
    albums: Album[];
    loading: boolean;
    error: string | null;
    getAlbums: () => Promise<void>;
}

export const useAlbumsStore = create<State>((set) => ({
    albums: [],
    loading: false,
    error: null,
    getAlbums: async () => {
        try {
            set({ loading: true, error: null });
            const albums = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/albums`).then((res) => res.json());
            set({ albums, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al obtener los álbumes' });
        }
    },
}));

export default useAlbumsStore;
