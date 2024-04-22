import NextAuth from "next-auth";
import { z } from 'zod';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { User } from '@/lib/definitions';

async function getUser(email: string, password: string): Promise<User> {
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

async function validateUser(user: User | undefined) {
    if (!user) {
        return null;
    }

    if (user.esta_verificado === false) {
        throw { error: 'not_verified', message: 'User is not verified' };
    }

    return user;
}




const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "email", placeholder: "test@test.com" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email, password);
                console.log('user:', user);
                const validatedUser = await validateUser(user);
                return validatedUser;
            }
            return null;
        },
        }),
    ],
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
        signIn: "/login",
        error: '/home',
        signOut: '/home',
    },
});

export { handler as GET, handler as POST };