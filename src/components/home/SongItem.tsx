import { Music } from '@/store/songs.store';
import Image from 'next/image';
import React, { useState } from 'react'
import PlayButton from './PlayButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { capitalizeWords } from '@/utils/CapitalizeWords';
import { ModalComponent } from '../ui/Modal/Modal';


interface SongsItemProps {
    id: number;
    data: Music;
    onClick: (id: number) => void;
}

const SongItem: React.FC<SongsItemProps> = ({ data, onClick, id }) => {
        const [ isModalOpen, setIsModalOpen ] = useState(false);
            const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const router = useRouter(); 

    const capitalizedMusicName = capitalizeWords(data.name);
    const handleModalClose = () => {
        setIsModalOpen(false);
        setMessage('');
    };
    return (
        <>
            <div
                onClick={() => session ? onClick(data.id) : setIsModalOpen(true)} 
                className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'
            >
                <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
                    <Image 
                        className='object-cover' 
                        src={data.image} 
                        alt='Image' 
                        layout='fill'
                        onClick={() => session? router.push(`/lists/${id}`) : null} 
                    />
                </div>
                <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
                    <p className='text-xl font-semibold truncate w-full'>{capitalizedMusicName}</p>
                    <p className='text-md text-neutral-400 pb-4 w-full truncate'>By {data.Artist?.name}</p>
                </div>
                <div
                    className='absolute bottom-24 right-5'
                >
                    <PlayButton/>
                </div>
            </div>
            <ModalComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            >
                <div className="flex items-center justify-center rounded-[20px] ">
                    <div 
                        className="
                        flex 
                        flex-col 
                        items-center 
                        bg-white 
                        text-center 
                        rounded-xl p-8 
                        space-y-4 
                        w-80
                        bg-gradient-to-b from-green-800 to-black
                        "
                    >
                        <button 
                            className="self-end text-gray-400 w-6 h-6 focus:outline-none"
                            onClick={handleModalClose}
                        >
                            ✖
                        </button>
                        {/* <img className="w-20" src="https://cdn-icons-png.flaticon.com/512/1047/1047711.png" alt="cookies-img" /> */}
                        <p className="mb-10 text-lg">
                            We use cookies for improving user experience, analytics and marketing.
                        </p>
                        <button
                            onClick={handleModalClose}
                            className="bg-red-500 text-white rounded-md w-48 py-3 text-sm focus:outline-none shadow-md"
                        >
                            ok, got it!
                        </button>
                    </div>
                </div>
            </ModalComponent>
        </>
    )
}

export default SongItem




// onClick={() => session ? null : router.push('/login')}