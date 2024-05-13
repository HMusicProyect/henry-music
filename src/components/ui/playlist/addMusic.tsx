import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import usePlaylistStore from '@/store/actions/playlist/playlist.store';
import useStore from '@/store/songs.store';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import { fetchUserPlaylists } from '@/store/actions/playlist/fetchUserPlaylists';
interface AddMusicToPlaylistProps {
    id: string;
    setset: any;
    setIsModalOpen: (arg0: boolean) => void;
}

export default function AddMusicToPlaylist ({ id, setset }: AddMusicToPlaylistProps) {
    const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

    const postSongToPlaylist = usePlaylistStore((state) => state.postSongToPlaylist);

    const searchParams = useSearchParams();
    const playlistID = searchParams.get('id') || '';

    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        if (selectedSongs.length === 0) {
            toast.error('Por favor, selecciona al menos una canción.');
            setIsLoading(false);
            return;
        }
        try {
            for (const songId of selectedSongs) {
                const song = postSongToPlaylist(id, songId);
            }
            setset((prev: number) => prev + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center" >
            <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded shadow-lg border border-gray-200">
                <label>
                    Select Songs:
                    <select multiple={true} onChange={handleSongSelect} className="p-2 rounded mt-2 block w-full">
                        {songs && songs.map((song) => (
                            <option key={song.id} value={song.id}>
                                {song.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button 
                    type="submit" 
                    className="bg-gray-900 text-white px-4 py-2 rounded mt-4 block w-full"
                >
                    Add Songs to Playlist
                </button>
            </form>
        </div>
    );
};