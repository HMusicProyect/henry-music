"use client"


import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useStore from '@/store/songs.store';
import useAlbumsStore from '@/store/albums.store';
import useAddSongsToAlbum from '@/store/hooks/useAddSongsToAlbum';


const AddSongsToAlbumModal = () => {
  const uploadModal = useAddSongsToAlbum();
  const [isLoading, setIsLoading] = useState(false);
  const { addSongAlbum } = useAlbumsStore();
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const { getMusic, todos } = useStore();
  const albumId = uploadModal.id;

  const router = useRouter();
  useEffect(() => {
    getMusic();
  }, [getMusic]);

  const handleSongSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSongs(Array.from(event.target.selectedOptions, option => option.value));
  };
  

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

      if (selectedSongs.length === 0) {
        toast.success('Por favor, selecciona al menos una canción.');
        setIsLoading(false);
        return;
      }
     
      const selectedSongId = selectedSongs[0];
      
      await addSongAlbum(albumId || '', selectedSongId)
      router.refresh(); // Actualizar la página después de agregar la canción al álbum
      setIsLoading(false);
      toast.success('Cancion actualizada en album correctamente');
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
      title="Agregar Canción al Album"
      description="Agrega la canción al album favorita."
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
        <label>
          Select Songs:
          <select multiple={true} onChange={handleSongSelect} className="p-2 rounded mt-2 block w-full">
            {todos && todos.map((song) => (
              <option key={song.id} value={song.id}>
                {song.name}
              </option>
            ))}
          </select>
        </label>
        <Button disabled={isLoading} type="submit">
          Add Song to Album
        </Button>
      </form>
    </Modal>
  );
}
export default AddSongsToAlbumModal;
