"use client"

import { Music } from '@/store/songs.store';
import { Plus, Library } from 'lucide-react';
import MediaItem from './MediaItem';
import usePlayer from '@/store/hooks/usePlayer';
import useOnPlay from '@/store/hooks/useOnPlay';

interface MusicLibraryProps {
    songs: Music[];
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ songs }) => {
    const player = usePlayer();
    const onPlay = useOnPlay(songs);

    const onClick = () => {

    }

    return (
        <div className='flex flex-col'>
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <Library />
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <Plus onClick={onClick} className='text-neutral-400 cursor-pointer hover:text-white transition' />

            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem
                        onClick={(id: number) => onPlay(id.toString())}
                        key={item.id}
                        data={item}
                    />
                ))}

            </div>
        </div>
    )
}

export default MusicLibrary;
