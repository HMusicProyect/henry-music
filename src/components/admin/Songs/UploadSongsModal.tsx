"use client"

import useUploadSongsModal from '@/store/hooks/useUploadSongModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAlbumsStore from '@/store/albums.store';
import useGenreStore from '@/store/genres.store';
import useArtistStore from '@/store/artist.store';
import SelectInput from './SelectInput';
import useStore from '@/store/songs.store';

const UploadSongsModal = () => {
  const uploadModal = useUploadSongsModal();
  const [isLoading, setIsLoading] = useState(false);
  const { albums, getAlbums, loading: albumLoading, error: albumError } = useAlbumsStore();
  const { genres, getGenres, loading: genreLoading, error: genreError } = useGenreStore();
  const { artists, getArtists, loading: artistLoading, error: artistError } = useArtistStore();
  const { addMusic } = useStore(); 
  const router = useRouter();

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


      const { title, pathMusic, image, albumId, genreId, artistId } = values;
      const newMusic = {
        name: title,
        pathMusic,
        image,
        AlbumsID: parseInt(albumId),
        GenreID: parseInt(genreId),
        ArtistID: parseInt(artistId),
      };

      await addMusic(newMusic);
      
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
          disabled={isLoading}
          {...register('pathMusic', {required: true})}
          placeholder='Song Url'
        />
        <Input 
          id='image'
          placeholder='Image Url'
          disabled={isLoading}
          {...register('image', {required: true})}
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
