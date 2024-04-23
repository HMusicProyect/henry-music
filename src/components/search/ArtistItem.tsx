import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PlayButton from '../home/PlayButton';
import { Artist } from '@/store/artist.store';

interface ArtistItemProps {
    artist: Artist;
    index: number;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ artist, index }) => {
    return (
        <Link href={`/home/artists/${artist.id}`}>
            <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-orange-400/5 cursor-pointer hover:bg-orange-400/10 transition p-3">
                <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
                    <Image
                        className='object-cover'
                        src={artist.image}
                        alt='Image'
                        layout='fill'
                    />
                </div>
                <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
                    <p className='text-md text-white pb-4 w-full truncate'>{artist.name}</p>
                </div>
                <div className='absolute bottom-24 right-5'>
                    <PlayButton />
                </div>
            </div>
        </Link>
    );
}

export default ArtistItem;
