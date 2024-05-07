import { Music } from "@/lib/definitions";
import { Album } from "../../albums.store";
import { Artist } from "../../artist.store";
import { Genre } from "../../genres.store";


export interface SearchResults {
    songs: Music[];
    artists: Artist[];
    genres: Genre[];
    albums: Album[];
}

const getSongByTitle = async (title: string): Promise<SearchResults> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/songs/search/${title}`);

        if (!response.ok) {
            throw new Error('Error al buscar las canciones');
        }
        const data = await response.json();
        return data || { songs: [], artists: [], genres: [], albums: [] };
    } catch (error) {
        throw new Error('Error al buscar las canciones');
    }
};

export default getSongByTitle;
