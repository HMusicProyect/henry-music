// updateUserInfo.ts
import { FilePair, UserWithPhoto } from '@/lib/definitions';
import { handlePhotoSubmit } from '@/store/actions/postCloudinary';




const  verifyUser = async (user: UserWithPhoto) => {
    // Crear un objeto que contenga solo las propiedades que deseas actualizar
    const updateData: UserWithPhoto = {};

    if(user.name !== undefined && user.name !== null && user.name !== ''){
        updateData.name = user.name;
    }

    if (user.photo !== undefined ) {
        const filePair: FilePair = { photo: user.photo };
        const photoUrl =  await handlePhotoSubmit(filePair);
        updateData.image = photoUrl.url;
    }

    if(Object.keys(updateData).length === 0){
        throw new Error('No changes were made');
    }

    return updateData;
}


export const updateUserInfo = async (user: UserWithPhoto, userSession: any) => {
    console.log('user', userSession.token);

    const updateData = await verifyUser(user);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/editNameAndPic/${userSession.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${userSession.token}`
        },
        body: JSON.stringify(updateData),
    });

    console.log('response', response);
    if (!response.ok) {
        throw new Error('Failed to update user information');
    }

    return response.json();
};