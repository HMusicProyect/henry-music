"use client"
import React, { useEffect, useState } from 'react';
import useArtistStore from '@/store/artist.store';
import useGenreStore from '@/store/genres.store';
import useAlbumsStore from '@/store/albums.store';
import MediaItem from '../ui/sidebar/MediaItem';
import Link from 'next/link';
import GenreItem from './GenreItem';
import ArtistItem from './ArtistItem';
import AlbumCard from '../ui/sidebar/AlbumCard';
import FilterBar from './FilterBar';
import { SearchResults } from '@/store/actions/song/getSongsByTitle';


interface SearchContentProps {
    searchResults: SearchResults;
    searchParams: {
        title: string;
    };
    error: string | null;
}

const SearchContent: React.FC<SearchContentProps> = ({ searchResults, searchParams, error }) => {
    const { songs, artists, genres, albums } = searchResults;
    const { loading: artistLoading, getArtists } = useArtistStore();
    const { loading: genreLoading, getGenres } = useGenreStore();
    const { loading: albumsLoading, getAlbums } = useAlbumsStore();
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

    let filteredContent = null;

    switch (activeFilter) {
        case 'Songs':
            filteredContent = (
                <div>
                    <h3 className='text-white text-2xl font-semibold'>Songs</h3>
                    {songs.map((song) => (
                        <div key={song.id} className='flex items-center gap-x-4 w-full'>
                            <Link href={`/home/lists/${song.id}`}>
                                <MediaItem
                                    onClick={() => song.id !== undefined && handleItemClick(song.id)}
                                    data={song}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            );
            break;
        case 'Artists':
            filteredContent = artists.length > 0 && (
                <div>
                    <h3 className='text-white text-2xl font-semibold'>Artists</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {artists.slice(0, 4).map((artist, index) => (
                            <ArtistItem key={artist.id} artist={artist} index={index} />
                        ))}
                    </div>
                </div>
            );
            break;
        case 'Genres':
            filteredContent = genres.length > 0 && (
                <div>
                    <h3 className='text-white text-2xl font-semibold'>Genres</h3>
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {genres.slice(0, 4).map((genre, index) => (
                            <GenreItem key={genre.id} genre={genre} index={index} />
                        ))}
                    </div>
                </div>
            );
            break;
        case 'Albums':
            filteredContent = albums.length > 0 && (
                <div>
                    <h3 className='text-white text-2xl font-semibold'>Albums</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                        {albums.map((album, index) => (
                            <AlbumCard key={index} imageUrl={album.image} name={album.name} />
                        ))}
                    </div>
                </div>
            );
            break;
        case 'All':
            filteredContent = (
                <div>
                    {songs.length > 0 && (
                        <>
                            <h3 className='text-white text-2xl font-semibold'>Songs</h3>
                            {songs.map((song) => (
                                <div key={song.id} className='flex items-center gap-x-4 w-full'>
                                    <Link href={`/home/lists/${song.id}`}>
                                        <MediaItem
                                            onClick={() => song.id !== undefined && handleItemClick(song.id)}
                                            data={song}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                    {artists.length > 0 && (
                        <>
                            <h3 className='text-white text-2xl font-semibold mt-8'>Artists</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {artists.slice(0, 4).map((artist, index) => (
                                    <ArtistItem key={artist.id} artist={artist} index={index} />
                                ))}
                            </div>
                        </>
                    )}
                    {genres.length > 0 && (
                        <>
                            <h3 className='text-white text-2xl font-semibold mt-8'>Genres</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {genres.slice(0, 4).map((genre, index) => (
                                    <GenreItem key={genre.id} genre={genre} index={index} />
                                ))}
                            </div>
                        </>
                    )}
                    {albums.length > 0 && (
                        <>
                            <h3 className='text-white text-2xl font-semibold mt-8'>Albums</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
                                {albums.map((album, index) => (
                                    <AlbumCard key={index} imageUrl={album.image} name={album.name} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            );
            break;
        default:
            break;
    }

    return (
        <div className='flex flex-col gap-y-2 w-full mt-4'>
            {error && (
                <div className="text-white text-2xl font-semibold flex items-center justify-center min-h-[40vh]">
                    <p>{error}</p>
                </div>
            )}
            {!error && (
                <>
                    <FilterBar
                        onSelectFilter={handleFilterSelect}
                        activeFilter={activeFilter}
                        hasSongs={songs.length > 0}
                        hasArtists={artists.length > 0}
                        hasGenres={genres.length > 0}
                        hasAlbums={albums.length > 0}
                    />
                    {filteredContent}
                </>
            )}
        </div>
    );
};

export default SearchContent;
