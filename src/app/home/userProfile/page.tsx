"use client"

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User } from '@/lib/definitions';
import { UserForm } from '@/components/home/UserProfile/UserForm';
import { UserInfo } from '@/components/home/UserProfile/UserInfo';
import { PasswordChangeForm } from '@/components/home/UserProfile/PasswordChangeForm';


const ProfilePage = () => {
    const { data: session, status } = useSession();
    const userSession: User = session?.user!;
    
    
    const router = useRouter();
    const [user, setUser] = useState<User>(userSession);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [passwordFieldsEnabled, setPasswordFieldsEnabled] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
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
            setUser(prevUser => ({ ...prevUser, photo: file }));
        }
    };


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, name: event.target.value }));
    };

    // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setUser(prevUser => ({ ...prevUser, email: event.target.value }));
    // };

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


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userSession?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                setMessage(['Error al actualizar el usuario']);
                throw new Error('Failed to update user');
            }

            const data = await response.json();

            
            setUser(data);

            setMessage(['Usuario actualizado con éxito']);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    const togglePasswordEdit = () => {
        setIsEditingPassword(!isEditingPassword);
    };
    
    if(userSession?.image === undefined) return <p>Cargando...</p>;
    const imageUrl = userSession?.image.replace('s96-c', 's1000-c');

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
                        user={userSession}
                        onUserChange={setUser}
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