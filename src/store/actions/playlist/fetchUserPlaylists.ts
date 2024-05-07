// fetchUserPlaylists.ts

import { Playlist } from "./test";

//este controlador es para traer las playlist del usuario que consulta
export const fetchUserPlaylists = async (id: string): Promise<Playlist[]> => {
    try {
        const response = await fetch(`https://api.example.com/user/${id}/playlists`);
        if (!response.ok) {
            throw new Error('Error al obtener las listas de reproducción del usuario');
        }
        const data = await response.json();
        return data; // Devuelve las listas de reproducción
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las listas de reproducción del usuario');
    }
};