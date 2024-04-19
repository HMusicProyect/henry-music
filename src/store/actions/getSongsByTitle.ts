import { Music } from "../songs.store";

const getSongByTitle = async (title: string): Promise<Music[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/search/${title}`);

        if (!response.ok) {
            throw new Error('Error al buscar las canciones');
        }
        const data = await response.json();
        return data || [];
    } catch (error) {
        throw new Error('Error al buscar las canciones');
    }
};

export default getSongByTitle;
