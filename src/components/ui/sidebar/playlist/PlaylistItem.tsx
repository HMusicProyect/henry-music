"use client"
import { capitalizeWords } from "@/utils/CapitalizeWords";
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


const PlaylistItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    if (!data) {
        return null;
    }
    const nameUrl = data.name.replace(/\s/g, '-');
    const capitalizedPlaylistName = capitalizeWords(data.name);
    const currentSong = data.image ? data : { image: '/images/Henrry music.svg'};

    // const handleClick = () => {
    //     if (onClick) {
    //         return onClick(data.id)
    //     }
    // }

    return (
        <Link
            href={`/home/playlist/${nameUrl}?id=${data?.id}`}
        >
            <div
                className="flex items-center gap-x-3 hover:bg-neutral-400/5 bg-neutral-800/5 cursor-pointer transition w-full p-2 rounded-md"
            >
                    <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                        <Image 
                            layout='fill' 
                            src={data.image ? data.image : '/images/HenrryMusic.svg'}
                            alt="Media Item" 
                            className="object-cover" 
                        />
                    </div>
                    <div className="flex flex-col gap-y-1 overflow-hidden">
                        <p className="text-white truncate">
                            {capitalizedPlaylistName}
                        </p>
                    </div>
            </div>
        </Link>
    )
}

export default PlaylistItem