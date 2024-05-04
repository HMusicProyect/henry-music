"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useBanUsersModal from '@/store/hooks/useBanUsersModal';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/user.store';

const UserBanModal = () => {
    const uploadModal = useBanUsersModal();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const { banUser } = useStore();

    const router = useRouter();
    const userId = uploadModal.user?.id;
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            name: '',
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            if (!values.name) {
                toast.error('Todos los campos son requeridos');
                return;
            }
            const token = session?.user?.token ?? '';
            console.log("Datos a enviar:", {
                userId: userId,
                token: token
            });

            await banUser(userId || '', token);
            router.refresh();
            setIsLoading(false);
            toast.success('Género creado correctamente');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Algo salió mal");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Banear Usuario"
            description="De estar seguro de banear al usuario por favor escribir. Banear"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
                <Input
                    id='name'
                    disabled={isLoading}
                    {...register('name', { required: true })}
                    placeholder='Escribir Respuesta'
                />
                <Button disabled={isLoading} type="submit" className='bg-red-800 text-white'>
                    Banear Usuario
                </Button>
            </form>
        </Modal>
    );
}

export default UserBanModal;
