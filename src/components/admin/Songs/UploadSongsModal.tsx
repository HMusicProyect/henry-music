"use client"

import useUploadSongsModal from '@/store/hooks/useUploadSongModal'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import React, { useState } from 'react'
import Modal from './Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';

const UploadSongsModal = () => {
  const uploadModal = useUploadSongsModal();
  const [isLoading, setIsLoading] = useState(false);

  const {register, handleSubmit, reset} = useForm<FieldValues>({
      defaultValues:{
        author:'',
        title:'',
        song: null,
        image: null,
      }
  })

  const onChange = (open: boolean) => {
    if(!open){
      reset();
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try{
      setIsLoading(true)

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if(!imageFile || !songFile){
        
      }
    }catch(error){
      toast.error("Algo salió mal")
      
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <Modal
      title="Upload Modal Title"
      description='Upload Modal description'
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-y-4'
      >
        <Input 
          id='title'
          disabled={isLoading}
          {...register('title', {required: true})}
          placeholder='Song Title'
        />
        <Input 
          id='author'
          disabled={isLoading}
          {...register('author', {required: true})}
          placeholder='Song Author'
        />
        <div>
          <div className='pb-1'>
              Select a song File
          </div>
          <Input 
            id='song'
            type='file'
            disabled={isLoading}
            accept='.mp3'
            {...register('song', {required: true})}
          />
        </div>

        <div>
          <div className='pb-1'>
              Select an Image
          </div>
          <Input 
            id='image'
            type='file'
            disabled={isLoading}
            accept='image/*'
            {...register('image', {required: true})}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create Song
        </Button>
      </form>
    </Modal>
  )
}

export default UploadSongsModal