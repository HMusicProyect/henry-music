import React from 'react'
import { Play } from 'lucide-react';
interface PlayButtonProps {
  onClick: () => void; // Añade una propiedad 'onClick'
}
const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className='transition opacity-0 rounded-full flex items-center bg-green-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'
        >
            <Play className="text-black" fill="black" size={25} />
        </button>
    )
}

export default PlayButton