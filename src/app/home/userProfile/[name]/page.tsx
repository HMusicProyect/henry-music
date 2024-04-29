"use client"
import { PasswordChangeForm } from '@/components/home/UserProfile/PasswordChangeForm';
import { UserForm } from '@/components/home/UserProfile/UserForm';
import UserProfile from '@/components/home/UserProfile/UserInfo';
import { updateUserInfo } from '@/components/home/UserProfile/updateUserInfo';
import { ModalComponent } from '@/components/ui/Modal/Modal';
import { UserWithPhoto } from '@/lib/definitions';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';



const ProfilePage = () => {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const userSession: UserWithPhoto = session?.user.user!;

    const [editProfile, setEditProfile] = useState<UserWithPhoto>({ name: '', photo: undefined });
    const [passwordFieldsEnabled, setPasswordFieldsEnabled] = useState(false);
    
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [message, setMessage]= useState<string[]>([]);
    const [ isModalOpen, setIsModalOpen ] = useState(false);



    if(status === "loading") return <p>Cargando...</p>;
    const userToken = session?.user.jti || session?.user.token;
    const id = searchParams.get('id');
    const token = searchParams.get('token');

    
    if(userToken !== token) {
        router.push('/home');
    }


    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditProfile(prevState => ({ ...prevState, name: event.target.value }));
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImageURL(URL.createObjectURL(file));
            if(file !== undefined){
                setEditProfile(prevState => ({ ...prevState, photo: file }));
            }
        }
    };



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await updateUserInfo(editProfile, userSession);
            console.log('response', response);

        if (response.status !== 'success') {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        setMessage(['Información de usuario actualizada con éxito']);
        setIsModalOpen(true);
        console.log('response', data);

        } catch (error) {
            setMessage(['Error al actualizar la información del usuario']);
            setIsModalOpen(true);
            console.error('Failed to update user information:', error);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    const togglePasswordEdit = () => {
        setIsEditingPassword(!isEditingPassword);
    };

    if(userSession?.image === undefined) return <p>Cargando...</p>;

    const handleModalClose = () => {
        setIsModalOpen(false);
        setMessage(['']);
        setImageURL(null);
    };

    return (
        <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
            <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                    <div className="flex justify-center">
                        <Image
                            className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"
                            src={userSession?.image!}
                            alt="" 
                            width={128}
                            height={128}
                        />
                    </div>
                    </div>
                        <div className="w-full px-4 text-center mt-20">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-black">
                                        22
                                    </span>
                                    <span className="text-sm text-black">Friends</span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-black">
                                        10
                                    </span>
                                    <span className="text-sm text-black">Cansiones</span>
                                </div>
                                <div className="lg:mr-4 p-3 text-center">
                                    <span className="text-xl font-bold block uppercase tracking-wide text-black">
                                        89
                                    </span>
                                    <span className="text-sm text-black">playlis</span>
                                </div>
                            </div>
                        </div>
                </div>

                {/* detalles del perfil */}
                
                    <div>
                        {session?.user?.provider !== 'google' &&  !isEditingPassword && (
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
                    
                <div>
                    {
                        session?.user?.provider !== 'google' &&  isEditingPassword ? (
                            <PasswordChangeForm 
                                handleCurrentPasswordChange={() => {}}
                                verifyCurrentPassword={() => {}}
                                handlePasswordChange={() => {}}
                                handleConfirmPasswordChange={() => {}}
                                passwordFieldsEnabled={passwordFieldsEnabled}
                                onSubmit={() => {}}
                            />
                            
                        ) : session?.user?.provider !== 'google' && isEditing ? (
                            <UserForm
                                user={editProfile}
                                onSubmit={handleSubmit}
                                handlePhotoChange={handlePhotoChange}
                                handleNameChange={handleNameChange}
                                imageURL={imageURL}
                                onUserChange={setEditProfile}
                            />
                            ) : (
                            <UserProfile session={userSession} />
                        )
                    }
                </div>

            </div>

        <div>
            <ModalComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            >
                <div className="flex items-center justify-center rounded-[20px] ">
                    <div 
                        className="
                        flex 
                        flex-col 
                        items-center 
                        bg-white 
                        text-center 
                        rounded-xl p-8 
                        space-y-4 
                        w-80
                        bg-gradient-to-b from-green-800 to-black
                        "
                    >
                        <button 
                            className="self-end text-gray-400 w-6 h-6 focus:outline-none"
                            onClick={handleModalClose}
                        >
                            ✖
                        </button>
                            <div>
                                {message.length > 0 && (
                                    <div className="flex justify-center items-center mt-2">
                                    <ul className="mb-0 text-red-500">
                                        {message.map((error) => (
                                        <li key={error}>
                                            <h1 className="mb-10 text-lg">
                                                {error}
                                            </h1>
                                        </li>
                                        ))}
                                    </ul>
                                    </div>
                                )}
                            </div>
                        <button
                            onClick={handleModalClose}
                            className="bg-red-500 text-white rounded-md w-48 py-3 text-sm focus:outline-none shadow-md"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </ModalComponent>
        </div>
        </div>
        <div>
            {message.length > 0 && (
                <div className="flex justify-center items-center mt-2">
                <ul className="mb-0 text-red-500">
                    {message.map((error) => (
                    <li key={error}>
                        <h1 className="mb-10 text-lg">
                            {error}
                        </h1>
                    </li>
                    ))}
                </ul>
                </div>
            )}
        </div>

        </div>
            <footer className="relative bg-transparent pt-8 pb-6 mt-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-white font-semibold py-1">
                                Contactanos 
                                <a href="https://www.creative-tim.com/product/notus-js" className="text-white hover:text-white" target="_blank">Necesitas ayuda?</a>  
                                <a href="https://www.creative-tim.com" className="text-white hover:text-white" target="_blank"> Somos H-Music</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default ProfilePage;


{/* 
         <form onSubmit={handleSubmit}>
             <label>
                 Nombre:
                 <input
                     type="text" 
                     value={editProfile.name} 
                     onChange={handleNameChange} 
                 />
             </label>
             <br />
             <label>
                 Foto de perfil:
                 <input 
                     type="file" 
                     onChange={handlePhotoChange} 
                 />
             </label>
             <br />
             <button 
                 type="submit"
             >
                 Guardar cambios
             </button>
         </form>


          */}