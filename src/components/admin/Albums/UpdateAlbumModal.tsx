"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handlePhotoSubmit } from '@/store/actions/postCloudinary';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/user.store';
import useUpdateAlbumModal from '@/store/hooks/useUpdateAlbums';
import useAlbumsStore from '@/store/albums.store';



const UpdateAlbumModal = () => {
  const uploadModal = useUpdateAlbumModal();

  const [isLoading, setIsLoading] = useState(false);
  const { updateAlbum } = useAlbumsStore();
  const [photoFile, setPhotoFile] = useState<File | undefined>(undefined);
  const { data: session } = useSession();
  const router = useRouter();
  const userId = uploadModal.albumId;
  const token = session?.user?.token ?? '';


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
        await updateAlbum(userId || '', undefined, image, token);
      }
      else if (name && !photoFile) {
        await updateAlbum(userId || '', name, undefined, token);
      }
      else if (name && photoFile) {
        photoUploadResponse = await handlePhotoSubmit({ photo: photoFile });
        image = photoUploadResponse.url;
        await updateAlbum(userId || '', name, image, token);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Album actualizado correctamente');
      reset();
      uploadModal.onClose();
    } catch (error: any) {
      toast.error("Algo salió mal", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Actualizar Album"
      description="Complete los detalles a continuación para actualizar al album."
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
          Update Artist
        </Button>
      </form>
    </Modal>
  );
}

export default UpdateAlbumModal;
