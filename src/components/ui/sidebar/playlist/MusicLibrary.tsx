"use client"
import Swal from 'sweetalert2';
import { Plus, Library } from 'lucide-react';
import usePlaylistStore from '@/store/actions/playlist/playlist.store';
import { User } from '@/lib/definitions';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

import PlaylistItem from './PlaylistItem';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Playlist{
    id: string;
    name: string;
}

interface MusicLibraryProps {
    playlist: Playlist[] | null; 
    user: User; 
}

const CreatePlaylistMenu: React.FC<{ onCreate: () => void, onClose: () => void }> = ({ onCreate, onClose }) => {
    const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        onClose();
    };

    return (
        <>
            <Plus 
                onClick={handleMenuOpen} 
                className='text-neutral-400 cursor-pointer hover:text-white transition'
            />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                style={{ backgroundColor: 'tuColorDeFondo' }}
            >
                <MenuItem onClick={onCreate} style={{ backgroundColor: 'tuColorDeFondo' }}>Crear Playlist</MenuItem>
                {/* <MenuItem onClick={handleMenuClose} style={{ backgroundColor: 'tuColorDeFondo' }}>Crear Carpeta</MenuItem> */}
            </Menu>
        </>
    );
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ playlist = [], user }) => {
    const postPlaylist = usePlaylistStore(state => state.postPlaylist);
    const userPlaylists = usePlaylistStore(state => state.userPlaylists);
    const { data: session, status } = useSession();

    const handleCreatePlaylist = () => {
        const defaultPlaylistName = "New Playlist";
        if (user?.id) {
            if (userPlaylists.length === 5 && session?.user.rol !== "premium") {
                Swal.fire({
                    icon: "error",
                    title: "Límite de playlist alcanzado",
                    text: "Para crear más playlists, conviértete en premium",
                    footer: '<a href="URL_AQUI">Hazte premium</a>'
                });
            } else {
                postPlaylist(defaultPlaylistName, user.id);
            }
        }
    };

    return (
        <div className='flex flex-col'>
            <div className="flex items-center justify-between px-5 pt-4">
                <Link
                    href="/home/playlist"
                >
                    <div className="inline-flex items-center gap-x-2">
                        <Library />
                        <p className="text-neutral-400 font-medium text-md">Your Library</p>
                    </div>
                </Link>

                <CreatePlaylistMenu onCreate={handleCreatePlaylist} onClose={() => {}} />
            </div>

            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {Array.isArray(playlist) && playlist.map((item) => (
                    <PlaylistItem
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default MusicLibrary;