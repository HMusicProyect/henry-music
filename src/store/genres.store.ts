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
    postGenre: (name: string) => Promise<void>;
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
    postGenre: async (name: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/genres`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name }),
            });
            if (!response.ok) {
                throw new Error('Error al agregar el género');
            }
            const newGenre = await response.json();
            set((state) => ({ ...state, genres: [...state.genres, newGenre] }));
        } catch (error) {
            console.error(error);
            throw new Error('Error al agregar el género');
        }
    },
}));

export default useGenreStore;
