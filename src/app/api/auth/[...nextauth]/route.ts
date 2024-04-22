import NextAuth from "next-auth";
import { z } from 'zod';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/lib/auth/user.auth";




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