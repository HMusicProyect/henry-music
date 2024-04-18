import NextAuth, { User as NextAuthUser }  from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import GoogleProvider from 'next-auth/providers/google';
import type { User } from '@/lib/definitions';
import bcrypt from 'bcrypt';


async function getUser(email: string, password: string): Promise<User | undefined> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login?email=${email}&password=${password}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user.');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { 
    handlers: {GET, POST},
    auth, 
    signIn, 
    signOut 
} = NextAuth({
    ...authConfig,
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        
        Credentials({
            async authorize(credentials): Promise<any> {
                try {
                    const parsedCredentials = z

                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await getUser(email, password);
                        
                        if (user?.access) {
                            return { email: credentials.email, name: 'User name' };
                        } else {
                            throw new Error("Error en la autenticación");
                        }
                        // if (user && user.password && password) {
                        //     const passwordsMatch = await bcrypt.compare(password, user.password);
                        //     if (passwordsMatch) return user; 
                        // }
                    }
                    return null;
                } catch (error) {
                    console.error('Failed to authorize:', error);
                    return null;
                }
            },
        }),
    ],
});