"use client"

import Card from './Card';
interface AlbumProps {
    imageUrl: string;
    songName: string;
    artistName: string;
  }
const AlbumCard: React.FC<AlbumProps> = ({ imageUrl, songName, artistName }) => {
    //aca podrian llegar por props los datos de cada album 
    return (
        <Card className="w-64 bg-stone-900 transition duration-400 ease-in-out hover:bg-neutral-800" >
            <img  src={imageUrl} alt="Album cover" className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-white">{songName}</h2>
                <p className="text-gray-300">{artistName}</p>
            </div>
        </Card>
    );
}

export default AlbumCard;