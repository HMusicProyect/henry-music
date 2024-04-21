import { useState } from 'react';

type User = {
    photo: File | null;
    name: string;
    email: string;
    password: string;
};

type UserProfileProps = {
    userSession: User;
    onSubmit: (user: User) => void;
};

const UserProfile = ({ userSession, onSubmit }: UserProfileProps) => {
    const [user, setUser] = useState<User>(userSession);
    const [confirmPassword, setConfirmPassword] = useState('');

    // Resto del código...
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setUser(prevUser => ({ ...prevUser, photo: file }));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handlePhotoChange} />
            <input type="text" value={user.name} onChange={handleNameChange} />
            <input type="email" value={user.email} onChange={handleEmailChange} />
            <input type="password" value={user.password} onChange={handlePasswordChange} />
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            <button type="submit">Guardar</button>
        </form>
    );
};

export default UserProfile;