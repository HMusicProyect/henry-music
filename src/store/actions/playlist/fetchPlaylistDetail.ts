// fetchPlaylistDetail.ts

//este controlador es para consulta el detalles de una playlist especifica
//que requiera el usuario

import { PlaylistDetail, PlaylistDetailData, PlaylistDetailSong, Song } from "./playlist.store";

export const fetchPlaylistDetail = async (id: string): Promise<PlaylistDetail> => {
    console.log('fetchPlaylistDetail', id);
    if (!id) {
        console.error('Error: ID is undefined');
        throw new Error('ID is undefined');
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getPlaylistDetail/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const playlistDetail: PlaylistDetail = {
            dataValues: data.dataValues as PlaylistDetailData,
            playlistDetails: data.playlistDetails as PlaylistDetailSong[],
            songs: data.songs as Song[],
        };
        return playlistDetail;
    } catch (error) {
        console.error('Error fetching playlist detail:', error);
        throw new Error('Error fetching playlist detail');
    }
};