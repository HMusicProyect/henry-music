interface FilePair {
    photo?: File;
    audio?: File;
}


    //Foto de perfil
export const handlePhotoSubmit = async (file: FilePair) => {
    const formData = new FormData();

    if(file.photo !== undefined && file.photo){
        formData.append('photo', file.photo);
        console.log('photo', formData);
    }

    if (file.audio !== undefined && file.audio) {
        formData.append('audio', file.audio);
        console.log('audio', formData);
    }

    if(formData !== undefined && formData !== null){
        const response = await fetch(`/api/upload`, {
            method: 'POST',
            body: formData,
        })

        const filePair = await response.json();
        console.log('filePair', filePair);
        return filePair;
    }
    
    return {
        message: 'error uploading file to Cloudinary',
        status: 500,
    }
};