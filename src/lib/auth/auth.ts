import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

import CredentialProvider from "next-auth/providers/credentials"
import { z } from 'zod';
import type { User } from '@/lib/definitions';


function saveUserToLocalstorage(user: User) {
    console.log('Saving user to localstorage:', user);
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
    } else{
        console.error('Failed to save user to localstorage:', user);
    
    }
}

async function validateUser(user: User | undefined) {
    if (!user) {
        return null;
    }

    if (user.esta_verificado === false) {
        throw { error: 'not_verified', message: 'User is not verified' };
    }

    return user;
}



async function getUser(email: string, password: string): Promise<User | undefined> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login?email=${email}&password=${password}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user.');
        }
        const user = await response.json();
        console.log('User:', user);
        if (user.error) throw user;
        saveUserToLocalstorage(user);
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


export const authOptions : NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                try {
                    const parsedCredentials = z

                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                    if (parsedCredentials.success) {
                        const { email, password } = parsedCredentials.data;
                        const user = await getUser(email, password);
                        const validatedUser = await validateUser(user);
                        return validatedUser;
                    }
                    return null;
                } catch (error) {
                    console.error('Failed to authorize:', error);
                    return null;
                }
            },
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === "development",
    
    callbacks: {
        async jwt({ token, user }) {
        return { ...token, ...user };
        },
        async session({ session, token }) {
        session.user = token as any;
        return session;
        },
    },
    pages: {
        signIn: "/login"
    }
}