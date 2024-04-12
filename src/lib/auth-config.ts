import NextAuth from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const auth: NextAuthOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("Credentials: ", credentials);

                const user: User = {
                    id:"1",
                    name: "test",
                    email: "test@email.com",
                    domain: "test.com",
                    role: "admin",
                }

                if(user){
                    return user
                }else{
                    return null
                }
            },
        }),
    ],

    // pages: {
    //     signIn: "/login",
    // },
};



















                // const res = await fetch(
                //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,
                //         {
                //             method: "POST",
                //             body: JSON.stringify({
                //             email: credentials?.email,
                //             password: credentials?.password,
                //             }),
                //             headers: { "Content-Type": "application/json" },
                //         }
                // );

                // const user = await res.json();
                // console.log(user);

                // if (user.error) throw user;

                // return user;