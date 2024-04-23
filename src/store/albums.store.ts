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
    postAlbum: (name: string, image: string) => Promise<void>;
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
    postAlbum: async (name: string, image: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/albums`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, image }),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el álbum');
            }
            const newAlbum = await response.json();
            set((state) => ({ ...state, albums: [...state.albums, newAlbum] }));
        } catch (error) {
            console.error(error);
            throw new Error('Error al agregar el álbum');
        }
    },
}));

export default useAlbumsStore;
