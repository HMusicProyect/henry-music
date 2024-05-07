// postPlaylist.ts
//este controlador es para crear una playlist nueva

import { Playlist } from "./test";

export const postPlaylist = async (name: string, userId: string): Promise<Playlist> => {
    if (!name || !userId) {
        console.error('Error: Name or User ID is undefined');
        throw new Error('Name or User ID is undefined');
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist`, {
            method: 'POST',
            body: JSON.stringify({ name, userId }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Devuelve la nueva lista de reproducción
    } catch (error) {
        console.error('Error posting new playlist:', error);
        throw new Error('Error posting new playlist');
    }
};