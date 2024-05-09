"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/user.store';
import useDeleteAdminModal from '@/store/hooks/useDeleteAdmin';
import useActionsUserModal from '@/store/hooks/useActionsUserModal';


const UserDeleteAdminModal = () => {
    const uploadModal = useDeleteAdminModal();
    const actionsModal = useActionsUserModal();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const { putDeleteAdmin } = useStore();

    const router = useRouter();
    const userId = uploadModal.userId;
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            name: '',
        }
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose()
            actionsModal.onClose()
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
            await putDeleteAdmin(userId || '', token)
            router.refresh();
            setIsLoading(false);
            toast.success('Se actualizó el rol del usuario');
            reset();
            uploadModal.onClose();
            actionsModal.onClose()
        } catch (error) {
            toast.error("Algo salió mal");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Quitar permisos de Administrador"
            description="De estar seguro de quitar permisos como Administrador escribir: disable"
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
                    Quitar Admin
                </Button>
            </form>
        </Modal>
    );
}

export default UserDeleteAdminModal;
