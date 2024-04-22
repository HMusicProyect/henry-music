"use client"
import React, { useEffect, useState } from 'react';
import useArtistStore, { Artist } from '@/store/artist.store';
import useGenreStore, { Genre } from '@/store/genres.store';
import useAlbumsStore, { Album } from '@/store/albums.store';
import MediaItem from '../ui/sidebar/MediaItem';
import Link from 'next/link';
import GenreItem from './GenreItem';
import ArtistItem from './ArtistItem';
import AlbumCard from '../ui/sidebar/AlbumCard';
import FilterBar from './FilterBar';
import { Music } from '@/store/songs.store';

interface SearchContentProps {
    songs: Music[];
    error: string | null;
}

const SearchContent: React.FC<SearchContentProps> = ({ songs, error }) => {
    const { artists, loading: artistLoading, getArtists } = useArtistStore();
    const { genres, loading: genreLoading, getGenres } = useGenreStore();
    const { albums, loading: albumsLoading, getAlbums } = useAlbumsStore();
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        getArtists();
        getGenres();
        getAlbums();
    }, []);

    const handleFilterSelect = (filter: string) => {
        setActiveFilter(filter);
    };

    const handleItemClick = (id: number) => {
        // Handle item click logic
    };

    if (artistLoading || genreLoading || albumsLoading) {
        return <div>Loading...</div>;
    }

    if (error || songs.length === 0) {
        return (
            error && (
                <p className="text-white text-lg font-semibold">{error}</p>
            )
        );
    }

    let filteredContent = null;

    switch (activeFilter) {
        case 'Songs':
            filteredContent = songs.map((song) => (
                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                    <Link href={`/lists/${song.id}`}>
                        <MediaItem
                            onClick={() => handleItemClick(song.id)}
                            data={song}
                        />
                    </Link>
                </div>
            ));
            break;
        case 'Artists':
            filteredContent = (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {artists.slice(0, 4).map((artist, index) => (
                        <ArtistItem key={artist.id} artist={artist} index={index} />
                    ))}
                </div>
            );
            break;
        case 'Genres':
            filteredContent = (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {genres.slice(0, 4).map((genre, index) => (
                        <GenreItem key={genre.id} genre={genre} index={index} />
                    ))}
                </div>
            );
            break;
        case 'Albums':
            filteredContent = (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                    {albums.map((album, index) => (
                        <AlbumCard key={index} imageUrl={album.image} name={album.name} />
                    ))}
                </div>
            );
            break;
        case 'All':
            filteredContent = (
                <div>
                    <h3 className='text-white text-2xl font-semibold'>Songs</h3>
                    {songs.map((song) => (
                        <div key={song.id} className='flex items-center gap-x-4 w-full'>
                            <Link href={`/lists/${song.id}`}>
                                <MediaItem
                                    onClick={() => handleItemClick(song.id)}
                                    data={song}
                                />
                            </Link>
                        </div>
                    ))}
                    <h3 className='text-white text-2xl font-semibold mt-8'>Artists</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {artists.slice(0, 4).map((artist, index) => (
                            <ArtistItem key={artist.id} artist={artist} index={index} />
                        ))}
                    </div>
                    <h3 className='text-white text-2xl font-semibold mt-8'>Genres</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {genres.slice(0, 4).map((genre, index) => (
                            <GenreItem key={genre.id} genre={genre} index={index} />
                        ))}
                    </div>
                    <h3 className='text-white text-2xl font-semibold mt-8'>Albums</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                        {albums.map((album, index) => (
                            <AlbumCard key={index} imageUrl={album.image} name={album.name} />
                        ))}
                    </div>
                </div>
            );
            break;
        default:
            break;
    }

    return (
        <div className='flex flex-col gap-y-2 w-full mt-4'>
            <FilterBar onSelectFilter={handleFilterSelect} />
            {filteredContent}
        </div>
    );
};

export default SearchContent;
