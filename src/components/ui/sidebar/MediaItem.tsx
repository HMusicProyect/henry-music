"use client"


import { Music } from "@/lib/definitions";
import { capitalizeWords } from "@/utils/CapitalizeWords";
import Image from "next/image";

interface MediaItemProps {
    data: Music;
    onClick?: (id: number) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {

    const capitalizedMusicName = capitalizeWords(data.name);
    const handleClick = () => {
        if (onClick) {
            return onClick(data.id!)
        }

        //TODO reproducir la musica
    }
    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 hover:bg-neutral-400/5 bg-neutral-800/5 cursor-pointer transition w-full p-2 rounded-md"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image 
                    layout='fill' 
                    src={data.image} 
                    alt="Media Item" 
                    className="object-cover" 
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">
                    {capitalizedMusicName}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.Artist?.name}
                </p>
            </div>
        </div>
    )
}

export default MediaItem