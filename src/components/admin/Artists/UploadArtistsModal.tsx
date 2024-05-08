"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUploadArtistsModal from '@/store/hooks/useUploadArtistsModal';
import useArtistStore from '@/store/artist.store';
import { handlePhotoSubmit } from '@/store/actions/postCloudinary';

const UploadArtistsModal = () => {
  const uploadModal = useUploadArtistsModal();
  const [isLoading, setIsLoading] = useState(false);
  const { postArtist } = useArtistStore(); 
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState<File | undefined>(undefined);
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      image: '',
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

      if (!values.name || !values.image) {
        toast.error('Todos los campos son requeridos');
        return;
      }

      let { name, image } = values;
      let photoUploadResponse;

      if (photoFile) {
        photoUploadResponse = await handlePhotoSubmit({ photo: photoFile });
        image = photoUploadResponse.url;
      }
      await postArtist(name, image);
      
      router.refresh();
      setIsLoading(false);
      toast.success('Artista creado correctamente');
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
      title="Agregar Nuevo Artista"
      description="Complete los detalles a continuación para agregar un nuevo artista."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input 
          id='name'
          disabled={isLoading}
          {...register('name', {required: true})}
          placeholder='Name of Artist'
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
            {...register('image', { required: true })}
            onChange={handleImageChange}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create Artist
        </Button>
      </form>
    </Modal>
  );
}

export default UploadArtistsModal;
