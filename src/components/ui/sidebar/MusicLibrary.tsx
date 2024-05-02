"use client"

import { Plus, Library } from 'lucide-react';
import MediaItem from './MediaItem';
import usePlayer from '@/store/hooks/usePlayer';
import useOnPlay from '@/store/hooks/useOnPlay';
import { Music } from '@/lib/definitions';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

interface MusicLibraryProps {
    songs: Music[];
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ songs }) => {

    const onPlay = useOnPlay(songs);

    const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className='flex flex-col'>
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <Library />
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>

                <Plus 
                    onClick={handleClick} 
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ backgroundColor: 'tuColorDeFondo' }} // Reemplaza 'tuColorDeFondo' con el color que desees
            >
                <MenuItem onClick={handleClose} style={{ backgroundColor: 'tuColorDeFondo' }}>Crear Playlist</MenuItem>
                <MenuItem onClick={handleClose} style={{ backgroundColor: 'tuColorDeFondo' }}>Crear Carpeta</MenuItem>
            </Menu>
            </div>

            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {Array.isArray(songs) && songs.map((item) => (
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
