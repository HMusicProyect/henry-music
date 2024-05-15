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



function generatePassword() {
    const length = 8;
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const all = lowercase + uppercase + numbers;

    let password = "";
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));

    for (let i = 3, n = all.length; i < length; ++i) {
        password += all.charAt(Math.floor(Math.random() * n));
    }

    // Mezclar la contraseña para que los primeros tres caracteres no sean siempre una letra minúscula, una letra mayúscula y un número
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}



export async function getUser(email: string, password: string): Promise<User> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login?email=${email}&password=${password}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
        const user = await response.json();
        if (user.error) throw user;

        // Asegúrate de que el id siempre sea una cadena
        if (user.id === undefined) {
            user.id = '';
        }

        return user;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to fetch user:', error.message);
            throw new Error(error.message);
        } else {
            console.error('Failed to fetch user:', error);
            throw error;
        }
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

    const newPassword = generatePassword();

    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(
                {   
                    image:credentials.image,
                    name: credentials.name, 
                    email:credentials.email, 
                    provider: provider,
                    password: newPassword
                })
        });

        if (!response.ok) {
            throw new Error(`API response status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}