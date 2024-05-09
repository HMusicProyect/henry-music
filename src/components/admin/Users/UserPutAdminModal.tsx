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
import usePutAdminModal from '@/store/hooks/usePutAdmin';
import useActionsUserModal from '@/store/hooks/useActionsUserModal';


const UserPutAdminModal = () => {
    const actionsModal = useActionsUserModal();
    const uploadModal = usePutAdminModal();
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const { putAdmin } = useStore();

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
            await putAdmin(userId || '', token)
            router.refresh();
            setIsLoading(false);
            toast.success('Permisos de administrador otorgados');
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
            title="Otorgar Como Administrador"
            description="De estar seguro de dar rol Administrador escribir: admin"
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
                <Button disabled={isLoading} type="submit" className='bg-blue-800 text-white'>
                    Otorgar Admin
                </Button>
            </form>
        </Modal>
    );
}

export default UserPutAdminModal;
