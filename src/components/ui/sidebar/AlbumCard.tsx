"use client"

import Image from 'next/image';
import Card from './Card';
interface AlbumProps {
    imageUrl: string;
    name?: string;
    artistName?: string;
}
const AlbumCard: React.FC<AlbumProps> = ({ imageUrl, name, artistName }) => {

    return (
        <Card className="mt-8 w-64 bg-yellow-800 transition duration-400 ease-in-out hover:bg-yellow-700" >
            <div className="relative h-64 w-full">
                <Image
                    src={`${imageUrl}` || `/images/default-profile.png`}
                    alt="Album cover"
                    className="object-cover rounded-t-lg"
                    width={500} 
                    height={300} 
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-white">{name}</h2>
                <p className="text-gray-300">{artistName}</p>
            </div>
        </Card>
    );
}

export default AlbumCard;