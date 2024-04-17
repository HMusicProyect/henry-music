import { Music } from '@/store/songs.store';
import Image from 'next/image';
import React from 'react'
import PlayButton from './PlayButton';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


interface SongsItemProps {
    id: number;
    data: Music;
    onClick: (id: number) => void;
}

const SongItem: React.FC<SongsItemProps> = ({ data, onClick, id }) => {
    const { data: session } = useSession();
    const router = useRouter(); 
    const capitalizeWords = (str: string): string => {
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };
    const capitalizedMusicName = capitalizeWords(data.name);
    return (
        <div
            onClick={() => onClick(data.id)}
            className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'
        >
            <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
                <Image 
                    className='object-cover' 
                    src={data.image} 
                    alt='Image' 
                    layout='fill' // 'fill' debe ser una propiedad, no un valor
                    onClick={() => session ? router.push(`/lists/${id}`) : router.push('/login')} // Verifica si el usuario ha iniciado sesión antes de navegar
                />
            </div>
            <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
                <p className='text-xl font-semibold truncate w-full'>{capitalizedMusicName}</p>
                <p className='text-md text-neutral-400 pb-4 w-full truncate'>By {data.Artist?.name}</p>
            </div>
            <div
                className='absolute bottom-24 right-5'
            >
                <PlayButton
                    onClick={() => session ? null : router.push('/login')}
                />
            </div>
        </div>
    )
}

export default SongItem




// onClick={() => session ? null : router.push('/login')}