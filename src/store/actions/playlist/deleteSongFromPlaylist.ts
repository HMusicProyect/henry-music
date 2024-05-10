// deleteSongFromPlaylist.ts
//este controlador es para eliminar una cancion de una playlist, recibe el id de la cancion y 
//el id de la playlist por params.

import { PlaylistDetail, PlaylistState } from "./playlist.store";

export const deleteSongFromPlaylist = async (songId: string, set: any  ): Promise<PlaylistDetail | undefined>  => {
    if (!songId) {
        console.error('Error: ID is undefined');
        return;
    }

    let updatedPlaylist: PlaylistDetail | null = null;
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

        // Actualizar solo la parte modificada del estado
        set((state: PlaylistState) => {
            const updatedPlaylistDetails = state.playlistDetail?.playlistDetails 
                ? state.playlistDetail.playlistDetails.filter((song: { id: string }) => song.id !== songId) 
                : [];

            return {
                ...state,
                playlistDetail: {
                    ...state.playlistDetail,
                    playlistDetails: updatedPlaylistDetails
                }
            };
        });

    } catch (error) {
        console.error('Error deleting song from playlist:', error);
    }
};