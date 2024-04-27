// updateUserInfo.ts
import { UserWithPhoto } from '@/lib/definitions';


const verifyUser = (user: UserWithPhoto) => {
    // Crear un objeto que contenga solo las propiedades que deseas actualizar
    const updateData: any = {};

    if(user.name !== undefined && user.name !== null && user.name !== ''){
        updateData.name = user.name;
    }

    if (user.image !== undefined && user.image !== null && user.image !== '') {
        updateData.image = user.image;
    }

    if(Object.keys(updateData).length === 0){
        throw new Error('No changes were made');
    }

    return updateData;
}


export const updateUserInfo = async (user: UserWithPhoto, userSession: any) => {

    const updateData = verifyUser(user);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/editNameAndPic/${userSession.email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        throw new Error('Failed to update user information');
    }

    return response.json();
};