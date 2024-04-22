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
}));

export default useArtistStore;
