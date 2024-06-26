"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useActionsUserModal from '@/store/hooks/useActionsUserModal';
import { handlePhotoSubmit } from '@/store/actions/postCloudinary';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/user.store';
import usePutAdminModal from '@/store/hooks/usePutAdmin';
import useDeleteAdminModal from '@/store/hooks/useDeleteAdmin';


const UserActionsModal = () => {
  const uploadModal = useActionsUserModal();
  const putAdminModal = usePutAdminModal();
  const deleteAdminModal = useDeleteAdminModal();
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useStore();
  const [photoFile, setPhotoFile] = useState<File | undefined>(undefined);
  const { data: session } = useSession();
  const router = useRouter();
  const userId = uploadModal.userId;
  const token = session?.user?.token ?? '';
  const isAdmin = uploadModal.isAdmin;

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const { register, handleSubmit, reset } = useForm<FieldValues>();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose()
    }
  }


  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      let { name, image } = values;
      let photoUploadResponse;

      if (photoFile && !name) {
        photoUploadResponse = await handlePhotoSubmit({ photo: photoFile });
        image = photoUploadResponse.url;
        await updateUser(userId || '', undefined, image, token);
      }
      else if (name && !photoFile) {
        await updateUser(userId || '', name, undefined, token);
      }
      else if (name && photoFile) {
        photoUploadResponse = await handlePhotoSubmit({ photo: photoFile });
        image = photoUploadResponse.url;
        await updateUser(userId || '', name, image, token);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Usuario actualizado correctamente');
      reset();
      uploadModal.onClose();
    } catch (error: any) {
      toast.error("Algo salió mal", error);
    } finally {
      setIsLoading(false);
    }
  }
  const onClickPutAdmin = (userId: string) => {
    return putAdminModal.onOpen(userId);
  }

  const onClickDeleteAdmin = (userId: string) => {
    return deleteAdminModal.onOpen(userId);
  }

  return (
    <Modal
      title="Actualizar Usuario"
      description="Complete los detalles a continuación para agregar un nuevo género."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input
          id='name'
          disabled={isLoading}
          {...register('name')}
          placeholder='New Name'
        />
        <div className='flex items-center'>
          <label htmlFor="image" className='w-1/2'>Select image:</label>
          <Input
            className='py-2'
            id='image'
            type='file'
            placeholder='Image Url'
            accept='image/*'
            disabled={isLoading}
            {...register('image')}
            onChange={handleImageChange}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Update User
        </Button>
      </form>
      {isAdmin && (
        <p
          className="mt-8 p-2 mr-2 rounded-full text-white cursor-pointer text-center"
          onClick={() => onClickDeleteAdmin(userId || '')}
        >Quitar Administrador
        </p>
      )}
      {!isAdmin && (
        <p className="mt-8 text-white cursor-pointer text-center"
          onClick={() => onClickPutAdmin(userId || '')}>
          Otorgar Administrador
        </p>
      )}
    </Modal>
  );
}

export default UserActionsModal;
