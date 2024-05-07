import NextAuth from "next-auth";
import { z } from 'zod';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser, postAuthorize } from "@/lib/auth/user.auth";

interface User {
    id: string;
    image: string;
    name: string;
    email: string;
    password: string;
    rol: string;
    ban: boolean;
    esta_verificado: boolean;
    verification_token: string;
}

interface JWT {
    sub: string;
    user: User;
    token: string;
    exp: number;
    [key: string]: any;
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
                return user;
            }
            return null;
        },
        }),
    ],
    
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider) {
                token.provider = account.provider;
                if (account?.provider === 'google') {
                    try {
                        const apiResponse = await postAuthorize(user, account.provider);
                        user = apiResponse;
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            return { ...token, ...user };
        },

        async session({ session, token: rawToken }) {
            const token = rawToken as JWT;

            session.provider = token.provider as any;

            if (session.provider === 'google'){
                session.user = token.user as any;
                console.log('session',session);
                return session;
            }

            const user = token.user as User;

            session.user = {
                sub: token.sub,
                id: user.id,
                image: user.image,
                name: user.name,
                email: user.email,
                password: user.password,
                rol: user.rol,
                token: token.token,
                expires: new Date(token.exp * 1000).toISOString(), // Convertir la fecha de expiración de UNIX a ISO
                esta_verificado: user.esta_verificado,
                ban: user.ban
            };
            console.log('----session User',session);
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: '/home',
    },
});

export { handler as GET, handler as POST };