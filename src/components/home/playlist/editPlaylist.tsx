// EditPlaylistDetails.tsx
import { useEffect, useState } from 'react';
import { capitalizeWords } from "@/utils/CapitalizeWords";
import toast from 'react-hot-toast';

interface EditPlaylistDetailsProps {
    playlistData: any;
    updatePlaylist: (id: string, name: string, image: File) => Promise<void>;
    globalState?: any; 
}

const EditPlaylistDetails: React.FC<EditPlaylistDetailsProps> = ({ playlistData, updatePlaylist, globalState }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newName, setNewName] = useState(playlistData.name);
    const [newImage, setNewImage] = useState(playlistData.image);

    useEffect(() => {
        setNewName(playlistData.name);
        setNewImage(playlistData.image);
    }, [playlistData, globalState]); 

    const handleSave = async () => {
        setIsLoading(true);

        if (playlistData) {
            let editedField = '';
            try {
                await updatePlaylist(
                    playlistData.id, 
                    isEditingName ? (editedField = 'Nombre', newName) : undefined, 
                    isEditingImage ? (editedField = 'Imagen', newImage) : undefined
                );
                setIsEditingName(false);
                setIsEditingImage(false);
                toast.success(`${editedField} de la playlist se ha actualizado correctamente.`);
            } catch (error) {
                toast.error(`Hubo un error al editar la ${editedField} de la playlist.`);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewImage(e.target.files[0]);
        }
    };

    return (
            <div>
                {isEditingName ? (
                    <input
                        type="text"
                        defaultValue={playlistData.name}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                ) : (
                    <h2 onClick={() => setIsEditingName(true)}>
                        {playlistData && capitalizeWords(playlistData.name)}
                    </h2>
                )}

                {isEditingImage ? (
                    <input
                        type="file"
                        onChange={handleImageChange}
                    />
                    ) : (
                    <img
                        src={playlistData?.image ? playlistData?.image : '/images/HenrryMusic.svg'}
                        alt={playlistData?.name}
                        onClick={() => setIsEditingImage(true)}
                    />
                )}

                {(isEditingName || isEditingImage) && (
                <   button onClick={handleSave}>Save</button>
                )}
            </div>
        );
    };

export default EditPlaylistDetails;