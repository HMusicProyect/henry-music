import { Music } from "@/lib/definitions";
import { create } from "zustand";

export interface State {
    musicGenre: Music[];
    loading: boolean;
    error: string | null;
    getSongsByGenre: (genreId: number) => Promise<void>; 
}

const useSongByGenre = create<State>((set) => ({
    musicGenre: [],
    loading: false,
    error: null,
    getSongsByGenre: async (genreId) => {
        try {
            set({ loading: true, error: null });
            const songs = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/genre/${genreId}`).then((res) => res.json());
            set({ musicGenre: songs, loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al obtener las canciones por género' });
        }
    },
    
}));

export default useSongByGenre;