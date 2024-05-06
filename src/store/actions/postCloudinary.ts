import { FilePair } from "@/lib/definitions";

    //Foto de perfil
export const handlePhotoSubmit = async (file: FilePair) => {
    const formData = new FormData();

    if(file.photo !== undefined && file.photo){
        formData.append('photo', file.photo);
    }

    if (file.audio !== undefined && file.audio) {
        formData.append('audio', file.audio);
    }

    if(formData !== undefined && formData !== null){
        try {
            const response = await fetch(`/api/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir el archivo a Cloudinary');
            }

            const data = await response.text();
            if (!data) {
                throw new Error('Respuesta vacía del servidor');
            }

            const filePair = JSON.parse(data);
            return filePair;
        } catch (error) {
            console.error(error);
            return {
                message: 'error uploading file to Cloudinary',
                status: 500,
            };
        }
    }
};