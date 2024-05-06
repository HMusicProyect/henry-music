"use client"

import { Music } from "@/lib/definitions";
import { capitalizeWords } from "@/utils/CapitalizeWords";
import Image from "next/image";

interface PlaylistDetails {
    ArtistName: string;
    GenreName: string;
    PlaylistID: string;
    SongsID: number;
    SongsImage: string;
    SongsName: string;
    id: string;
}

interface MediaItemProps {
    data: Music | PlaylistDetails;
    onClick?: (id: number) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const isMusic = (data: Music | PlaylistDetails): data is Music => {
        return (data as Music).name !== undefined;
    }

    const capitalizedMusicName = isMusic(data) ? capitalizeWords(data.name) : data.SongsName;

    const handleClick = () => {
        if (onClick) {
            if (isMusic(data) && data.id !== undefined) {
                return onClick(data.id);
            } else if (!isMusic(data) && data.SongsID !== undefined) {
                return onClick(data.SongsID);
            }
        }
    }

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 hover:bg-neutral-400/5 bg-neutral-800/5 cursor-pointer transition w-full p-2 rounded-md"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image 
                    layout='fill' 
                    src={isMusic(data) ? data.image || '/images/default-profile.png' : data.SongsImage || '/images/default-profile.png'} 
                    alt="Media Item" 
                    className="object-cover" 
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">
                    {capitalizedMusicName}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {isMusic(data) ? data.Artist?.name : data.ArtistName}
                </p>
            </div>
        </div>
    )
}

export default MediaItem;