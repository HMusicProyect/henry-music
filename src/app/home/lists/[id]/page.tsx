"use client"

import { useEffect, useState } from 'react';
import useStore from '@/store/songs.store';
import { useSession } from 'next-auth/react';
import Header from '@/components/ui/header/Header';
import { FastAverageColor } from 'fast-average-color';
import Image from 'next/image';
import { capitalizeWords } from '@/utils/CapitalizeWords';
import { Play } from 'lucide-react';
import usePlayer from '@/store/hooks/usePlayer';
import { Music } from '@/lib/definitions';
import FormReview from '@/components/lists/id/formReview';
import MediaItem from '@/components/ui/sidebar/MediaItem';
import Link from 'next/link';
import useSongByGenre from '@/store/actions/getSongsByGenre';
import useReviewsStore from '@/store/reviews.store';
import useGetSongById from '@/store/actions/getSongById';


interface Props {
    id: number;
}

export default function MusicPlayer({ params }: { params: Props }) {
    const { data: session, status } = useSession();
    
    const userSession = session?.user.provider === 'google' ? session?.user! : session?.user.user!;

    const { getSongReviews, reviews, loading } = useReviewsStore();
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState<string>('');
    const { song, getMusicById } = useGetSongById();
    const { musicGenre, getSongsByGenre } = useSongByGenre()
    const player = usePlayer();
    const [currentSong, setCurrentSong] = useState<Music | null | undefined>(null);
    const id = params.id;

    useEffect(() => {
        if (id) {
            getMusicById(id);
        }
    }, [id]);

    useEffect(() => {
        if (song.length > 0) {
            const initialSong = song.find(song => song != null);
            setCurrentSong(initialSong || null);
        }
    }, [song]);

    useEffect(() => {
        if (currentSong && currentSong.GenreID) {
            getSongsByGenre(currentSong.GenreID);
        }
    }, [currentSong]);

    useEffect(() => {
        if (currentSong && currentSong.image) {
            const fac = new FastAverageColor();
            const img = document.createElement('img');
            img.crossOrigin = 'Anonymous';
            img.src = currentSong.image as string;
            img.onload = () => {
                const color = fac.getColor(img);
                setHeaderBackgroundColor(color.hex);
            };
        }
    }, [currentSong]);

    useEffect(() => {
        if (currentSong) {
            getSongReviews(currentSong.id!);
        }
    }, [currentSong]);


    const handlePlayClick = () => {
        if (currentSong) {
            player.setId(currentSong.id!.toString());
            player.setIds(song.map((song) => song.id!.toString()));
        }
    };
    const handleReviewSubmit = () => {
        getSongReviews(currentSong!.id!);
    };

    if (status === 'loading') {
        return <div>Cargando...</div>;
    }

    return (
        <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
            {currentSong && (
                <div className={``}>
                    <Header className={headerBackgroundColor}>
                        <h1 className="bg-neutral-900"></h1>
                    </Header>
                    <div className='mt-2 mb-7 px-6'>
                        <div className="flex gap-x-4 items-center">
                            <div className="relative rounded-lg overflow-hidden">
                                <Image
                                    className="w-full h-full object-cover"
                                    src={currentSong.image}
                                    alt={currentSong.name}
                                    width={300}
                                    height={400}
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold">{capitalizeWords(currentSong.name)}</h2>
                                <p className="text-md text-gray-500">
                                    <span className='text-white font-semibold text-md'>Artist: </span>
                                    {currentSong.Artist?.name}
                                </p>
                                <p className="text-md text-gray-500">
                                    <span className='text-white font-semibold text-md'>Genre: </span>
                                    {currentSong.Genre?.name}
                                </p>
                                <button
                                    className='transition rounded-full flex items-center bg-yellow-500 p-4 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110'
                                    onClick={handlePlayClick}
                                >
                                    <Play className="text-black" fill="black" size={25} />
                                </button>
                                {currentSong && <p className='mt-8'>Now playing: {currentSong.name}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='px-6 mt-8 mb-7 flex flex-col'>
                <div className='w-full rounded-md bg-neutral-400/5 p-8 min-h-56 flex-col gap-y-4 border-white flex'>
                    <h2 className='text-center'>All Reviews</h2>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id}>
                                <p>{review.content}</p>
                                <p>Punctuation: {review.punctuation}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available for this song</p>
                    )}

                </div>
            </div>
            <div className='mt-8 mb-7 px-6 flex gap-x-16'>
                <div className='w-1/2'>
                    <FormReview
                        currentSongId={currentSong?.id || 0}
                        userId={userSession?.id || ''}
                        onReviewSubmit={handleReviewSubmit}
                    />
                </div>
                <div className='w-1/2 flex flex-col gap-8'>
                    <h2 className='text-left'>Explore songs of the same genre</h2>
                    {musicGenre.map((song) => (
                        <Link
                            href={`/home/lists/${song.id}`}
                            key={song.id}
                        >
                            <MediaItem
                                data={song}
                            />
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
