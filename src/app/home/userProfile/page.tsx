"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserWithPhoto } from '@/lib/definitions';
import { UserForm } from '@/components/home/UserProfile/UserForm';
import { UserInfo } from '@/components/home/UserProfile/UserInfo';
import { PasswordChangeForm } from '@/components/home/UserProfile/PasswordChangeForm';
import { handlePhotoSubmit } from '@/store/actions/postCloudinary';
import { updateUserInfo } from '@/components/home/UserProfile/updateUserInfo';


const ProfilePage = () => {
    const { data: session, status } = useSession();
    const userSession: UserWithPhoto = session?.user!;
    
    
    const router = useRouter();

    const [user, setUser] = useState<UserWithPhoto>(userSession);
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [passwordFieldsEnabled, setPasswordFieldsEnabled] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [imageURL, setImageURL] = useState<string | null>(null);
    

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage]= useState<string[]>([]);

    if(status === "loading") return <p>Cargando...</p>;

    if(!session) router.push('/home');


    const verifyCurrentPassword = async () => {
        try {
            const {email, password} = userSession;

            if(password === currentPassword){
                setPasswordFieldsEnabled(true);
            } else {
                setMessage(['La contraseña actual es incorrecta']);
            }
        } catch (error) {
            setMessage(['Error al verificar la contraseña actual']);
            console.error('Failed to verify password:', error);
        }
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log('file', file);

            setImageURL(URL.createObjectURL(file));

            if(file !== undefined){
                setUser(prevUser => ({ ...prevUser, photo: file }));
            }
        }
    };


    const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            console.log('file', file);
            console.log('file', file.type);
          // Comprueba si el archivo es un mp3
        if ((file.type !== 'audio/mpeg') && (file.type !== 'audio/mp3') ) {
            console.error('El archivo no es un audio mp3 o mpeg');
            return;
        }

            setUser(prevUser => ({ ...prevUser, audio: file}));
        }
    };









    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setUser(prevUser => ({ ...prevUser, name: value }));
    };


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, password: event.target.value }));
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };
    const handleCurrentPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value);
    };

const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
        setMessage(['No hay información de usuario disponible']);
        return;
    }

    if (user.password !== confirmPassword) {
        setMessage(['Las contraseñas no coinciden']);
        return;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userSession?.id}/editPasword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                password: currentPassword, 
                email: userSession?.email, 
                newPassword: user.password 
            }),
        });

        if (!response.ok) {
            setMessage(['Error al actualizar la contraseña']);
            throw new Error('Failed to update password');
        }

        setMessage(['Contraseña actualizada con éxito']);
    } catch (error) {
        setMessage(['Error al actualizar la contraseña']);
        console.error('Failed to update password:', error);
    }
};


    // envio a la api
    const clearUnchangedFields = (user: UserWithPhoto, userSession: UserWithPhoto) => {
        if (user.name === userSession.name) {
            user.name = '';
        }

        if (user.image === userSession.image) {
            user.image = '';
        }
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearUnchangedFields(user, userSession);

        if (!user.image && !user.name) {
            setMessage(['No hay información de usuario disponible']);
            return;
        }

        let photoUrl = user.image;
        let updatedUser = { ...user };

            
        try {
            // si la imagen existe  ejecuta la funcion handlePhotoSubmit
            if (user.image !== '') {
                photoUrl = await handlePhotoSubmit(user);
                updatedUser = { ...user, image: photoUrl };
            }
            console.log('updatedUser', updatedUser);

            const res = await updateUserInfo(updatedUser, userSession);
            
            console.log('res', res);

            setUser(prevUser => ({ ...prevUser, image: photoUrl }));

            setMessage(['Información de usuario actualizada con éxito']);


        } catch (error) {
            setMessage(['Error al actualizar la información del usuario']);
            console.error('Failed to update user information:', error);
        }
    };


    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    const togglePasswordEdit = () => {
        setIsEditingPassword(!isEditingPassword);
    };
    
    if(user?.image === undefined) return <p>Cargando...</p>;

    const imageUrl = user?.image.replace('s96-c', 's1000-c');

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-5">Perfil de Usuario</h1>
        <div className="w-24 h-24 mb-4 relative">
            <div className="bg-gray-500 opacity-50 absolute inset-0 rounded"></div>
                <Image
                    className="rounded-full w-full h-full object-cover absolute inset-0" 
                    src={imageUrl}
                    alt="img perfil"
                    layout='fill' 
                />
        </div>

        <div>
            {!isEditingPassword && (
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={toggleEdit}
                >
                    {isEditing ? 'Ver Perfil' : 'Editar Perfil'}
                </button>
            )}
            <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={togglePasswordEdit}
            >
                {isEditingPassword ? 'Cancelar Edición de Contraseña' : 'Editar Contraseña'}
            </button>
        </div>
        <div className="min-h-[500px]">
            {
                isEditingPassword ? (
                    <PasswordChangeForm
                        handleCurrentPasswordChange={handleCurrentPasswordChange}
                        verifyCurrentPassword={verifyCurrentPassword}
                        handlePasswordChange={handlePasswordChange}
                        handleConfirmPasswordChange={handleConfirmPasswordChange}
                        passwordFieldsEnabled={passwordFieldsEnabled}
                        onSubmit={handlePasswordSubmit} 
                    />
                ) : isEditing ? (
                    <UserForm
                        imageURL={imageURL}
                        user={user}
                        onUserChange={setUser}
                        // onSubmit={handleSubmit}
                        onSubmit={handleSubmit}
                        handlePhotoChange={handlePhotoChange}
                        handleNameChange={handleNameChange}
                        // handleEmailChange={handleEmailChange}
                    />
                ) : (
                    <UserInfo user={userSession}/>
                )
            }
        </div>
        {message.length > 0 && (
            <div className="flex justify-center items-center mt-2">
            <ul className="mb-0 text-red-500">
                {message.map((error) => (
                <li key={error}>{error}</li>
                ))}
            </ul>
            </div>
        )}
    </div>
    );
};

export default ProfilePage;