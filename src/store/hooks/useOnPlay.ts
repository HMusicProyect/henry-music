import { Music } from "../songs.store";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: Music[]) => {
    const player = usePlayer();
    const onPlay = (id: string) => {
        player.setId(id);
        player.setIds(songs.map((song) => song.id.toString()));
    };

    return onPlay;
}

export default useOnPlay;