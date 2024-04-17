"use client"

import { Music } from '@/store/songs.store'
import React from 'react'
import SongItem from './SongItem';
import useOnPlay from '@/store/hooks/useOnPlay';
import Link from 'next/link';

interface SongsPageProps {
    songs: Music[];
}

const SongsPage: React.FC<SongsPageProps> = ({ songs }) => {

    const onPlay = useOnPlay(songs);


    if (songs.length === 0) {
        return (
            <div className='mt-4 text-neutral-400'>
                No Songs Available.
            </div>
        )
    }

    return (
        <div>
            <div className='mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4'>

                {songs.map((item) => (
                    <Link
                        key={item.id}
                        href={`/lists/${item.id}`}
                    >
                        <SongItem
                            key={item.id}
                            onClick={(id: number) => onPlay(id.toString())}
                            data={item}
                        />
                    </Link>
                ))}
            </div>
        </div>
    )

}

export default SongsPage