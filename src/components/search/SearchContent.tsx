"use client"

import { Music } from '@/store/songs.store'
import MediaItem from '../ui/sidebar/MediaItem';
import Link from 'next/link';

interface SearchContentProps {
    songs: Music[];
    error: string | null;
}

const SearchContent: React.FC<SearchContentProps> = ({ songs, error }) => {

    const handleItemClick = (id: number) => {
        //
    };

    const defaultGenres = [
        { id: 1, name: 'Pop' },
        { id: 2, name: 'Rock' },
        { id: 3, name: 'Hip Hop' },
    ];

    const defaultArtists = [
        { id: 1, name: 'Artist 1' },
        { id: 2, name: 'Artist 2' },
        { id: 3, name: 'Artist 3' },
    ];
    if (error) {
        return (
            <div className='flex flex-col gap-y-2 w-full text-neutral-400 mt-4'>
                <h3 className='text-white text-2xl font-semibold mt-4'>Géneros</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                    {defaultGenres.map((genre) => (
                        <Link key={genre.id} href={`/home/genres/${genre.id}`}>
                            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-yellow-400/5 cursor-pointer hover:bg-yellow-400/10 transition p-3">
                                {genre.name}
                            </div>
                        </Link>
                    ))}
                </div>
                <h3 className='text-white text-2xl font-semibold mt-4'>Artistas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                    {defaultArtists.map((artist) => (
                        <Link key={artist.id} href={`/home/artists/${artist.id}`}>
                            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-orange-400/5 cursor-pointer hover:bg-orange-400/10 transition p-3">
                                {artist.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

   
    if (songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full text-neutral-400 mt-4'>
                <h3 className='text-white text-2xl font-semibold mt-4'>No se encontraron resultados</h3>
                <h3 className='text-white text-2xl font-semibold mt-4'>Géneros</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                    {defaultGenres.map((genre) => (
                        <Link key={genre.id} href={`/home/genres/${genre.id}`}>
                            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-yellow-400/5 cursor-pointer hover:bg-yellow-400/10 transition p-3">
                                {genre.name}
                            </div>
                        </Link>
                    ))}
                </div>
                <h3 className='text-white text-2xl font-semibold mt-4'>Artistas</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                    {defaultArtists.map((artist) => (
                        <Link key={artist.id} href={`/home/artists/${artist.id}`}>
                            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-orange-400/5 cursor-pointer hover:bg-orange-400/10 transition p-3">
                                {artist.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }


    return (
        <div className='flex flex-col gap-y-2 w-full mt-4'>
            
            {songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <Link href={`/home/lists/${song.id}`}>
                        <MediaItem
                            onClick={() => handleItemClick(song.id)}
                            data={song}
                        />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default SearchContent;
