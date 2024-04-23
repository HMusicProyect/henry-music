"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import useUploadGenresModal from '@/store/hooks/useUploadGenresModal';
import useGenreStore from '@/store/genres.store';

const UploadGenresModal = () => {
  const uploadModal = useUploadGenresModal();
  const [isLoading, setIsLoading] = useState(false);
  const { postGenre } = useGenreStore(); 
  const router = useRouter();

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

      const { name } = values;
      await postGenre(name);
      
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
      title="Agregar Nuevo Genero"
      description='Upload Modal description'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <Input 
          id='name'
          disabled={isLoading}
          {...register('name', {required: true})}
          placeholder='Name of Genre'
        />   
        <Button disabled={isLoading} type="submit">
          Create Genre
        </Button>
      </form>
    </Modal>
  );
}

export default UploadGenresModal;
