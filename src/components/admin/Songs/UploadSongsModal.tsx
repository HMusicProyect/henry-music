"use client"

import useUploadSongsModal from '@/store/hooks/useUploadSongModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAlbumsStore from '@/store/albums.store';
import useGenreStore from '@/store/genres.store';
import useArtistStore from '@/store/artist.store';
import useStore from '@/store/songs.store';
import SelectInput from '../ui/SelectInput';
import { handlePhotoSubmit } from '@/store/actions/postCloudinary';
import { useSession } from 'next-auth/react';

const UploadSongsModal = () => {
  const uploadModal = useUploadSongsModal();

  const [photoFile, setPhotoFile] = useState<File | undefined>(undefined);
  const [audioFile, setAudioFile] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { albums, getAlbums, loading: albumLoading, error: albumError } = useAlbumsStore();
  const { genres, getGenres, loading: genreLoading, error: genreError } = useGenreStore();
  const { artists, getArtists, loading: artistLoading, error: artistError } = useArtistStore();
  const { addMusic } = useStore(); 
  const router = useRouter();
  const {data: session} = useSession();

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  const handleAudioChange = (e:any) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  useEffect(() => {
    getAlbums();
    getGenres();
    getArtists();
  }, []);

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      pathMusic: '',
      image: '',
      albumId: '', 
      genreId: '',
      artistId: '',
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

      if (!values.title || !values.pathMusic || !values.image || !values.albumId || !values.genreId || !values.artistId) {
        toast.error('Todos los campos son requeridos');
        return;
      }
   
      
      let { title, pathMusic, image, albumId, genreId, artistId } = values;

      let photoUploadResponse;
      let audioUploadResponse;
  
      if (photoFile) {
        photoUploadResponse = await handlePhotoSubmit({ photo: photoFile });
        //console.log("Respuesta de subida de foto:", photoUploadResponse);
        image = photoUploadResponse.url;
      }
  
      if (audioFile) {
        audioUploadResponse = await handlePhotoSubmit({ audio: audioFile });
        //console.log("Respuesta de subida de audio:", audioUploadResponse);
        pathMusic = audioUploadResponse.url;
      }

      const newMusic = {
        name: title,
        pathMusic,
        image,
        AlbumsID: parseInt(albumId),
        GenreID: parseInt(genreId),
        ArtistID: parseInt(artistId),
      };

      const token = session?.user?.token ?? '';
      await addMusic(newMusic, token);
      
      router.refresh();
      setIsLoading(false);
      toast.success('Canción creada correctamente');
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
          id='Song Url'
          type='file'
          disabled={isLoading}
          accept='.mp3'
          {...register('pathMusic', {required: true})}
          placeholder='Song Url'
          onChange={handleAudioChange}
          
        />
        <Input 
          id='image'
          type='file'
          placeholder='Image Url'
          accept='image/*'
          disabled={isLoading}
          {...register('image', {required: true})}
          onChange={handleImageChange}
        />
        <SelectInput
          id="albumId"
          label="Álbum"
          options={albums}
          isLoading={isLoading || albumLoading}
          error={albumError}
          register={register}
          required
        />
        <SelectInput
          id="genreId"
          label="Género"
          options={genres}
          isLoading={isLoading || genreLoading}
          error={genreError}
          register={register}
          required
        />
        <SelectInput
          id="artistId"
          label="Artista"
          options={artists}
          isLoading={isLoading || artistLoading}
          error={artistError}
          register={register}
          required
        />
        <Button disabled={isLoading} type="submit">
          Create Song
        </Button>
      </form>
    </Modal>
  );
}

export default UploadSongsModal;
