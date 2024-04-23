"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useUploadAlbumsModal from '@/store/hooks/useUploadAlbumsModal';
import useAlbumsStore from '@/store/albums.store';

const UploadAlbumsModal = () => {
  const uploadModal = useUploadAlbumsModal();
  const [isLoading, setIsLoading] = useState(false);
  const { postAlbum } = useAlbumsStore(); 
  const router = useRouter();

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

      const { name, image } = values;
      await postAlbum(name, image);
      
      router.refresh();
      setIsLoading(false);
      toast.success('Album creado correctamente');
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
      title="Add New Album"
      description="Fill in the details below to add a new album."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input 
          id='name'
          disabled={isLoading}
          {...register('name', {required: true})}
          placeholder='Name of Album'
        />
        <Input 
          id='image'
          placeholder='Album Image'
          disabled={isLoading}
          {...register('image', {required: true})}
        />
        
        <Button disabled={isLoading} type="submit">
          Create Album
        </Button>
      </form>
    </Modal>
  );
}

export default UploadAlbumsModal;
