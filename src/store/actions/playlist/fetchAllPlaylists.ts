// fetchAllPlaylists.ts

import { Playlist } from "./test";

//este controlador es para traer la playlist de todos los usuarios en la
//base de datos

export const fetchAllPlaylists = async (): Promise<Playlist[]> => {
    try {
        const response = await fetch(`https://api.example.com/playlists`);
        if (!response.ok) {
            throw new Error('Error al obtener todas las listas de reproducción');
        }
        const data = await response.json();
        return data; // Devuelve las listas de reproducción
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener todas las listas de reproducción');
    }
};