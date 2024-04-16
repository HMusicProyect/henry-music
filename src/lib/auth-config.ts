import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const auth: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                },
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("Credentials: ", credentials);

                const user  = {
                    id:"1",
                    name: "test",
                    email: "test@email.com",
                    domain: "test.com",
                    role: "admin",
                    password: "password",
                }
                if(user){
                    return user;
                }else{
                    return null;
                }
            },
        }),
        
    ],
    // secret: process.env.SECRET,
    pages: {
        signIn: "/login",
    },
};