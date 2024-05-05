import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import usePlaylistStore from '@/store/playlist.store';
import useStore from '@/store/songs.store';

interface AddMusicToPlaylistProps {
    id: string;
}

const AddMusicToPlaylist = ({ id }: AddMusicToPlaylistProps) => {
    const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
    const postSongToPlaylist = usePlaylistStore((state) => state.postSongToPlaylist);
    const getMusic = useStore((state) => state.getMusic);
    const songs = useStore((state) => state.todos);

    useEffect(() => {
        getMusic();
    }, [getMusic]);

    const handleSongSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSongs(Array.from(event.target.selectedOptions, option => option.value));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedSongs.length === 0) {
            alert('Por favor, selecciona al menos una canción.');
            return;
        }
        for (const songId of selectedSongs) {
            postSongToPlaylist(id, songId);
        }
        alert('Las canciones se han agregado con éxito a la playlist.');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Select Songs:
                <select multiple={true} onChange={handleSongSelect}>
                    {songs && songs.map((song) => (
                        <option key={song.id} value={song.id}>
                            {song.name}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Add Songs to Playlist</button>
        </form>
    );
};

export default AddMusicToPlaylist;