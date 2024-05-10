// deleteSongFromPlaylist.ts
//este controlador es para eliminar una cancion de una playlist, recibe el id de la cancion y 
//el id de la playlist por params.

import { PlaylistDetail } from "./playlist.store";

export const deleteSongFromPlaylist = async (songId: string  ): Promise<PlaylistDetail | undefined>  => {
    if (!songId) {
        console.error('Error: ID is undefined');
        return;
    }
    let updatedPlaylist;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/deleteSongFromPlaylist?id=${songId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        updatedPlaylist = data.playlistDetail?.songs
            ? { 
                ...data.playlistDetail, 
                songs: data.playlistDetail.songs.filter((song: { id: string }) => song.id !== songId) 
            }
            : data.playlistDetail;

    } catch (error) {
        console.error('Error deleting song from playlist:', error);
    }
    return updatedPlaylist;
};