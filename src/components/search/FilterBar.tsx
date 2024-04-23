import React from 'react';

interface FilterBarProps {
    onSelectFilter: (filter: string) => void;
    activeFilter: string;
    hasSongs: boolean;
    hasArtists: boolean;
    hasGenres: boolean;
    hasAlbums: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSelectFilter, activeFilter, hasSongs, hasArtists, hasGenres, hasAlbums }) => {
    const handleFilterClick = (filter: string) => {
        onSelectFilter(filter);
    };

    return (
        <div className='flex items-start gap-x-4 my-4'>
            <div
                className={`text-md bg-${activeFilter === 'All' ? 'white' : 'neutral-400/10'} text-${
                    activeFilter === 'All' ? 'black' : 'white'
                } hover:bg-${activeFilter === 'All' ? 'white' : 'neutral-400/5'} p-1 px-3 rounded-full cursor-pointer transition-all`}
                onClick={() => handleFilterClick('All')}
            >
                <p className=''>All</p>
            </div>
            {hasSongs && (
                <div
                    className={`text-md bg-${activeFilter === 'Songs' ? 'white' : 'neutral-400/10'} text-${
                        activeFilter === 'Songs' ? 'black' : 'white'
                    } hover:bg-${activeFilter === 'Songs' ? 'white' : 'neutral-400/5'} p-1 px-3 rounded-full cursor-pointer transition-all`}
                    onClick={() => handleFilterClick('Songs')}
                >
                    <p className=''>Songs</p>
                </div>
            )}
            {hasArtists && (
                <div
                    className={`text-md bg-${activeFilter === 'Artists' ? 'white' : 'neutral-400/10'} text-${
                        activeFilter === 'Artists' ? 'black' : 'white'
                    } hover:bg-${activeFilter === 'Artists' ? 'white' : 'neutral-400/5'} p-1 px-3 rounded-full cursor-pointer transition-all`}
                    onClick={() => handleFilterClick('Artists')}
                >
                    <p className=''>Artists</p>
                </div>
            )}
            {hasGenres && (
                <div
                    className={`text-md bg-${activeFilter === 'Genres' ? 'white' : 'neutral-400/10'} text-${
                        activeFilter === 'Genres' ? 'black' : 'white'
                    } hover:bg-${activeFilter === 'Genres' ? 'white' : 'neutral-400/5'} p-1 px-3 rounded-full cursor-pointer transition-all`}
                    onClick={() => handleFilterClick('Genres')}
                >
                    <p className=''>Genres</p>
                </div>
            )}
            {hasAlbums && (
                <div
                    className={`text-md bg-${activeFilter === 'Albums' ? 'white' : 'neutral-400/10'} text-${
                        activeFilter === 'Albums' ? 'black' : 'white'
                    } hover:bg-${activeFilter === 'Albums' ? 'white' : 'neutral-400/5'} p-1 px-3 rounded-full cursor-pointer transition-all`}
                    onClick={() => handleFilterClick('Albums')}
                >
                    <p className=''>Albums</p>
                </div>
            )}
        </div>
    );
};

export default FilterBar;
