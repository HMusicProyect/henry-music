// EditPlaylistDetails.tsx
import { useEffect, useState } from 'react';
import { capitalizeWords } from "@/utils/CapitalizeWords";
import toast from 'react-hot-toast';
import Image from 'next/image';
import usePlaylistStore from '@/store/actions/playlist/playlist.store';
interface EditPlaylistDetailsProps {
    setset: any;
    globalState?: any; 
    setIsModalOpen: (arg0: boolean) => void;
}

const EditPlaylistDetails: React.FC<EditPlaylistDetailsProps> = ({ globalState, setIsModalOpen, setset }) => {
    
    const updatePlaylist = usePlaylistStore((state) => state.updatePlaylist);
    const playlistDetail = usePlaylistStore((state) => state.playlistDetail?.dataValues);
    
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newName, setNewName] = useState(playlistDetail?.name);
    const [newImage, setNewImage] = useState(playlistDetail?.image);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(undefined);
    

    useEffect(() => {
        setNewName(playlistDetail?.name);
        setNewImage(playlistDetail?.image);
        if (playlistDetail?.image instanceof File) {
            setPreviewImageUrl(URL.createObjectURL(playlistDetail.image));
        }
    }, [playlistDetail, globalState]);

    const handleSave = async () => {
        setIsLoading(true);
        
        if (playlistDetail) {
            let editedField = '';
            try {
                await updatePlaylist(
                    playlistDetail.id, 
                    isEditingName ? (editedField = 'Nombre', newName) : undefined, 
                    isEditingImage && newImage instanceof File ? (editedField = 'Imagen', newImage) : undefined
                );
                setIsEditingName(false);
                setIsEditingImage(false);
                toast.success(`${editedField} de la playlist se ha actualizado correctamente.`);
                setIsModalOpen(false);
                setset((prev: number) => prev + 1);
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
            setIsEditingImage(true);
            setPreviewImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
            <div>
                <div className="flex items-start flex-col justify-start">
                    <label 
                        className="text-sm text-white  dark:text-gray-200 mr-2" 
                        htmlFor="name"
                    >
                        Nombre:
                    </label>
                    {isEditingName ? (
                        <input
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            type="text"
                            defaultValue={playlistDetail?.name}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    ) : (
                        <h2 onClick={() => setIsEditingName(true)}>
                            {playlistDetail && capitalizeWords(playlistDetail.name)}
                        </h2>
                    )}
                </div>
                <div className="flex items-center justify-center w-full">
                    <label 
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        htmlFor="dropzone-file" 
                    >
                        
                        <input
                            id="dropzone-file" 
                            type="file" 
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <Image
                            src={previewImageUrl ? previewImageUrl : '/images/HenrryMusic.svg'}
                            alt={playlistDetail?.name || 'Default alt text'}
                            width={100} 
                            height={100} 
                            onClick={() => setIsEditingImage(true)}
                        />
                    </label>
                </div>

                {(isEditingName || isEditingImage) && (
                    <button 
                        onClick={handleSave}
                    >
                        Save</button>
                )}
            </div>
        );
    };

export default EditPlaylistDetails;