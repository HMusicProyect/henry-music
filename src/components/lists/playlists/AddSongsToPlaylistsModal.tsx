"use client"

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '@/components/ui/header/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Modal from '@/components/admin/ui/Modal';
import useAddSongsToPlaylistModal from '@/store/hooks/useAddSongsToPlaylist';
import usePlaylistStore from '@/store/playlist.store';
import useStore from '@/store/songs.store';

interface AddMusicToPlaylistProps {
  playlistId: string;
}

const AddSongsToPlaylistsModal = ({playlistId}: AddMusicToPlaylistProps) => {
 
  const uploadModal = useAddSongsToPlaylistModal();
  const [isLoading, setIsLoading] = useState(false);
  const { postSongToPlaylist } = usePlaylistStore();
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const { getMusic, todos } = useStore();

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
      
      await postSongToPlaylist(playlistId, selectedSongId);
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
      title="Agregar Canción a Playlist"
      description="Agrega la canción a tu playlist favorita."
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
          Create Genre
        </Button>
      </form>
    </Modal>
  );
}

export default AddSongsToPlaylistsModal;
