"use client"

import { Music } from '@/store/songs.store'
import MediaItem from '../ui/sidebar/MediaItem';

interface SearchContentProps {
    songs: Music[];
    error: string | null;
}

const SearchContent: React.FC<SearchContentProps> = ({ songs, error }) => {

    if (error) {
        return (
            <div className='flex flex-col gap-y-2 w-full text-neutral-400 mt-4'>
                {error}
            </div>
        );
    }

    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full text-neutral-400 mt-4'>
                No se encontró una canción relacionada.
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-y-2 w-full mt-4'>
            {songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <div className='flex-1'>
                        <MediaItem
                            onClick={() => { }}
                            data={song}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SearchContent;
