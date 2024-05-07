    // deleteSongFromPlaylist.ts
    //este controlador es para eliminar una cancion de una playlist, recibe el id de la cancion y 
    //el id de la playlist por params.

import { Playlist, PlaylistState } from "./test";

export const deleteSongFromPlaylist = async (songId: string, playlistId: string, set: (state: (state: PlaylistState) => Partial<PlaylistState>) => void): Promise<Playlist | undefined>  => {
    if (!songId || !playlistId) {
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

        set((state: PlaylistState) => {
            updatedPlaylist = state.playlistDetail?.songs
                ? { 
                    ...state.playlistDetail, 
                    songs: state.playlistDetail.songs.filter((song: { id: string }) => song.id !== songId) 
                }
                : state.playlistDetail;
            return { playlistDetail: updatedPlaylist };
        });

    } catch (error) {
        console.error('Error deleting song from playlist:', error);
    }
    return updatedPlaylist;
};