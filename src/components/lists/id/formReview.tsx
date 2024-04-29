"use client"

import Button from '@/components/ui/header/Button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import ReactStars from 'react-stars';
import toast from 'react-hot-toast';
import useReviewsStore from '@/store/reviews.store';

interface FormReviewProps {
    currentSongId: number;
    userId: string;
    onReviewSubmit: () => void; 
}

const FormReview: React.FC<FormReviewProps> = ({ currentSongId, userId, onReviewSubmit }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [punctuation, setPunctuation] = useState<number>(0);
    const { addReview } = useReviewsStore();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            content: '',
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            if (!values.content || punctuation === 0) {
                toast.error('Todos los campos son requeridos');
                return;
            }

            const { content } = values;
            console.log("Datos enviados:", { content, punctuation, currentSongId, userId });
            await addReview(content, punctuation, currentSongId, userId)
            onReviewSubmit(); 
            router.refresh();
            setIsLoading(false);
            toast.success('Review Agregada correctamente');
            reset();
            setPunctuation(0);

        } catch (error) {
            toast.error("Algo salió mal");
        } finally {
            setIsLoading(false);
        }
    }

    const handleStarsChange = (newRating: number) => {
        setPunctuation(newRating);
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)} className='w-full rounded-md bg-neutral-400/5 p-8 min-h-56 flex flex-col gap-y-4'>
            <h2 className='text-center'>Give a Song Review</h2>
            <div className='flex flex-col gap-2 justify-start text-left'>
                <p>Commentary:</p>
                <textarea className="textarea flex w-full min-h-16 max-h-32 rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm resize-none overflow-y-auto file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus-outline" id="message"
                    {...register('content', { required: true })} />
            </div>
            <div className='flex gap-2 items-center justify-start'>
                <p>Rating: </p>
                <ReactStars
                    count={5}
                    size={24}
                    color2={'#eab308'}
                    value={punctuation}
                    onChange={handleStarsChange}
                />
            </div>
            <Button disabled={isLoading} className='bg-yellow-500' type="submit">
                Give a Review
            </Button>
        </form>

    )
}

export default FormReview