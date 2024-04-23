// userUtils.ts

export type User = {
    id: string;
    image?: string;
    name?: string;
    email?: string;
    password?: string;
};

export type ValidationUser = {
    id?: string;
    image?: string;
    name?: string;
    email?: string;
    password?: string;
};

export async function getUser(email: string, password: string): Promise<User> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login?email=${email}&password=${password}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user.');
        }
        const user = await response.json();
        if (user.error) throw user;

        // Asegúrate de que el id siempre sea una cadena
        if (user.id === undefined) {
            user.id = '';
        }

        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}



export const validatePassword = (password: string) => {
    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[A-Z]/.test(password)) {
        return 'La contraseña debe incluir al menos una letra mayúscula';
    }
    if (!/[a-z]/.test(password)) {
        return 'La contraseña debe incluir al menos una letra minúscula';
    }
    if (!/[0-9]/.test(password)) {
        return 'La contraseña debe incluir al menos un número';
    }
    return null;
};


export const validateUser = (user: ValidationUser) => {
    if (!user.password) {
        return "La contraseña es requerida";
    }
    if (!user.email) {
        return "El email es requerido";
    }
    return validatePassword(user.password);
};
