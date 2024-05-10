
import { PlaylistDetail, PlaylistState } from "./playlist.store";

export const postSongToPlaylist = async (playlistId: string, songId: string, set:any ):  Promise<PlaylistDetail | undefined> => {
    if (!playlistId || !songId) {
        console.error('Error: Playlist ID or Song ID is undefined');
        return;
    }
    let updatedPlaylist: PlaylistDetail | null = null;
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
        console.log(`data----`,data)
        const newSong = data.newSong;

        updatedPlaylist = data.playlistDetail?.songs
            ? { 
                ...data.playlistDetail, 
                songs: [...data.playlistDetail.songs, newSong] 
            }
            : data.playlistDetail;


        set((state: PlaylistState) => ({
            ...state,
            playlistDetail: updatedPlaylist
        }));

        
        return data;

    } catch (error) {
        console.error('Error posting song to playlist:', error);
    }
};