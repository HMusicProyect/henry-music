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




export async function postAuthorize(credentials: any, provider: string) {
    const { name, email, password } = credentials;
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { 
                    name: credentials.name, 
                    email:credentials.email, 
                    provider: provider,
                    password: credentials.id
                }) // Enviar solo estos datos
        });

        if (!response.ok) {
            throw new Error(`API response status: ${response.status}`);
        }

        return await response.json(); // Devolver la respuesta de la API
    } catch (error) {
        console.error(error);
        throw error;
    }
}