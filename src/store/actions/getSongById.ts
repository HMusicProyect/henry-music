import { Music } from "@/lib/definitions";
import { create } from "zustand";

export interface State {
    song: Music[] | null;
    loading: boolean;
    error: string | null;
    getMusicById: (id: number) => Promise<void>;

};

const useGetSongById = create<State>((set) => ({
    song: [],
    loading: false,
    error: null,
    getMusicById: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const music = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/${id}`)
                .then((res) => res.json());
            set({ song: [music], loading: false });
        } catch (error) {
            set({ loading: false, error: 'Error al buscar la canción' });
        }
    },
}));

export default useGetSongById;
