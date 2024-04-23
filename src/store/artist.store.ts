import { create } from 'zustand';

export interface Artist {
    id: number;
    name: string;
    image: string;
}

export interface State {
    artists: Artist[];
    loading: boolean;
    error: string | null;
    getArtists: () => Promise<void>;
    postArtist: (name: string, image: string) => Promise<void>;
}

export const useArtistStore = create<State>((set) => ({
    artists: [],
    loading: false,
    error: null,
    getArtists: async () => {
        try {
            set({ loading: true, error: null });
            const artists = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artists`).then((res) => res.json());
            set({ artists, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al obtener los artistas' });
        }
    },
    postArtist: async (name: string, image: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/artists`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, image }),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el artista');
            }
            const newArtist = await response.json();
            set((state) => ({ ...state, artists: [...state.artists, newArtist] }));
        } catch (error) {
            console.error(error);
            throw new Error('Error al agregar el artista');
        }
    },
}));

export default useArtistStore;
