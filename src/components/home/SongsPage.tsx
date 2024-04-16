"use client"

import { Music } from '@/store/songs.store'
import React from 'react'
import SongItem from './SongItem';

interface SongsPageProps {
    songs: Music[];
}

const SongsPage: React.FC<SongsPageProps> = ({ songs }) => {
    if (songs.length === 0) {
        return (
            <div className='mt-4 text-neutral-400'>
                No Songs Available.
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={() => { }}
                    data={item}
                />
            ))}
        </div>
    )

}

export default SongsPage