import { useEffect } from 'react';
import usePlaylistStore from "@/store/actions/playlist/playlist.store";

function useFavoritePlaylistMusic() {
  const userPlaylists = usePlaylistStore(state => state.userPlaylists);
  const fetchPlaylistDetail = usePlaylistStore((state) => state.fetchPlaylistDetail);
  const otherDetails = usePlaylistStore((state) => state.playlistDetail?.playlistDetails);

  useEffect(() => {
    async function getFavoritePlaylistMusic() {
      const favoritePlaylist = userPlaylists.find(playlist => playlist.name === 'Favoritos');

      if (favoritePlaylist) {
        const favoritePlaylistId = favoritePlaylist.id;
        fetchPlaylistDetail(favoritePlaylistId);
      } else {
        console.log("No se encontró la playlist 'Favoritos'");
      }
    }

    getFavoritePlaylistMusic();
  }, [userPlaylists, fetchPlaylistDetail]);

  return otherDetails;
}

export default useFavoritePlaylistMusic;