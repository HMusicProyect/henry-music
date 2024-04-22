import { create } from 'zustand';

export interface Genre {
    id: number;
    name: string;
}

interface GenreState {
    genres: Genre[];
    loading: boolean;
    error: string | null;
    getGenres: () => Promise<void>;
}

const useGenreStore = create<GenreState>((set) => ({
    genres: [],
    loading: false,
    error: null,
    getGenres: async () => {
        try {
            set({ loading: true, error: null });
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/genres`);
            const genres = await response.json();
            set({ genres, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al obtener los géneros' });
        }
    },
}));

export default useGenreStore;
