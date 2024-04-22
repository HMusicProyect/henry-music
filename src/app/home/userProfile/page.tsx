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

    if(status === "loading") return <p>Cargando...</p>;

    if(!session) router.push('/home');


    const verifyCurrentPassword = async () => {
        try {
            // Realiza una solicitud POST a tu servidor para verificar la contraseña
            const {email, password} = userSession;
            console.log('password:', password)
            console.log('currentPassword:', currentPassword)

            if(password === currentPassword){
                setPasswordFieldsEnabled(true);
            } else {
                alert('La contraseña actual es incorrecta');
            }
        } catch (error) {
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

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => ({ ...prevUser, email: event.target.value }));
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
        alert('No hay información de usuario disponible');
        return;
    }

    if (user.password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    console.log('user:', currentPassword, 'user.password ', user.password, 'userSession?.email', userSession?.email )

    try {
        const response = await fetch(`http://localhost:3001/users/${userSession?.id}/editPasword`, {
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
            throw new Error('Failed to update password');
        }

        alert('Contraseña actualizada con éxito');
    } catch (error) {
        console.error('Failed to update password:', error);
    }
};


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('user:', userSession?.id)

    

        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userSession?.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            const data = await response.json();

            
            setUser(data);

            alert('Usuario actualizado con éxito');
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
                    width={1000}
                    height={1000}
                    quality={100}
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
                        handleEmailChange={handleEmailChange}
                    />
                ) : (
                    <UserInfo user={userSession}/>
                )
            }
        </div>
    </div>
    );
};

export default ProfilePage;