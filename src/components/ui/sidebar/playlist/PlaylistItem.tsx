"use client"

import { capitalizeWords } from "@/utils/CapitalizeWords";
import usePlaylistStore from '@/store/actions/playlist/playlist.store';
import Image from "next/image";
import Link from "next/link";

interface Playlist{
    id: string;
    name: string;
    image?: string;
}

interface MediaItemProps {
    data: Playlist;
    onClick?: (id: string) => void;
}

const PlaylistItem: React.FC<MediaItemProps> = ({ data }) => {
    
    const deletePlaylist = usePlaylistStore((state) => state.deletePlaylist);
    if (!data) {
        return null;
    }

    const nameUrl = data.name.replace(/\s/g, '-');
    const capitalizedPlaylistName = capitalizeWords(data.name);
    const imageUrl = data.image || '/images/HenrryMusic.svg';

    return (
        <div className="flex items-center justify-between gap-x-3 hover:bg-neutral-400/5 bg-neutral-800/5 cursor-pointer transition w-full p-2 rounded-md">
            <Link href={`/home/playlistDetail/${nameUrl}?id=${data.id}`}>
                <div className="flex items-center gap-x-3">
                    <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                        <Image 
                            layout='fill' 
                            src={imageUrl}
                            alt="Media Item" 
                            className="object-cover" 
                        />
                    </div>
                    <div className="flex flex-col gap-y-1 overflow-hidden">
                        <p className="text-white truncate break-words">
                            {capitalizedPlaylistName}
                        </p>
                    </div>
                </div>
            </Link>
            <button 
                className="text-gray-400 w-6 h-6 focus:outline-none"
                onClick={(e) => {
                    // Evita que el evento de clic se propague al elemento padre (Link)
                    e.stopPropagation();
                    // Llama a deleteSongFromPlaylist con el id de la canción
                    deletePlaylist(data?.id);
                }}
            >
                ✖
            </button>
        </div>
    );
}

export default PlaylistItem;