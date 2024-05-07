    // Este módulo define una función para agregar una canción a una lista de reproducción en una base de datos.

import { Music } from "./test";


export const postSongToPlaylist = async (playlistId: string, song: Music) => {
    if (!playlistId || !song.id) {
        console.error('Error: Playlist ID or Song ID is undefined');
        return;
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postPlaylist`, {
            method: 'POST',
            body: JSON.stringify({ playlistId, songId: song.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error posting song to playlist:', error);
    }
};