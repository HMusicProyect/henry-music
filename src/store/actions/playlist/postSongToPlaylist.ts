    // Este módulo define una función para agregar una canción a una lista de reproducción en una base de datos.

import { Song } from "./playlist.store";




export const postSongToPlaylist = async (playlistId: string, songId: string) => {

    // console.log('postSongToPlaylist songId',songId)
    // console.log('postSongToPlaylist playlistId', playlistId)
    if (!playlistId || !songId) {
        console.error('Error: Playlist ID or Song ID is undefined');
        return;
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/postPlaylist`, {
            method: 'POST',
            body: JSON.stringify({ playlistId, songId }),
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