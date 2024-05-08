    // deletePlaylist.ts

import { PlaylistState } from "./playlist.store";

    //este controlador es para eliminar una playlist, toma el id de la playlist a eliminar por params y la 
    //elimina.
    export const deletePlaylist = async (id: string, set: Function) => {
        console.log('deletePlaylist', id)
        if (!id) {
            console.error('Error: ID is undefined');
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playlist/deletePlaylist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                if (response.headers.get('content-type')?.includes('application/json')) {
                    const data = await response.json();
                    console.error(`HTTP error! status: ${response.status}, message: ${data.error}`);
                } else {
                    console.log(response)
                    console.error(`HTTP error! status: ${response.status}`);
                }
                return;
            }

            set((state: PlaylistState) => {
                const updatedUserPlaylists = state.userPlaylists.filter((playlist: { id: string }) => playlist.id !== id);
                const updatedAllPlaylists = state.allPlaylists.filter((playlist: { id: string }) => playlist.id !== id);
                return { 
                    userPlaylists: updatedUserPlaylists,
                    allPlaylists: updatedAllPlaylists,
                    playlistDetail: state.playlistDetail?.id === id ? null : state.playlistDetail
                };
            });

        } catch (error) {
            console.log(error)
            console.error('Error deleting playlist:', error);
        }
    };