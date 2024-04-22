// userUtils.ts
import { User } from '@/lib/definitions';

export async function getUser(email: string, password: string): Promise<User> {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login?email=${email}&password=${password}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user.');
        }
        const user = await response.json();
        if (user.error) throw user;
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

