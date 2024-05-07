// fetchPlaylistDetail.ts

import { Playlist } from "./test";

//este controlador es para consulta el detalles de una playlist especifica
//que requiera el usuario

export const fetchPlaylistDetail = async (id: string): Promise<Playlist> => {
    if (!id) {
        console.error('Error: ID is undefined');
        throw new Error('ID is undefined');
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getPlaylistDetail/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Devuelve los detalles de la lista de reproducción
    } catch (error) {
        console.error('Error fetching playlist detail:', error);
        throw new Error('Error fetching playlist detail');
    }
};