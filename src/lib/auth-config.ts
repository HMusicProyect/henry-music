import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const auth: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                // authorization: {
                //     params: {
                //         prompt: "consent",
                //         access_type: "offline",
                //         response_type: "code"
                //     }
                // },
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "test@test.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) : Promise<any>{

                console.log("Authorize method", credentials)

                if(!credentials?.email || !credentials?.password) throw new Error("Datos de Login necesarios")
                try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login?email=${credentials.email}&password=${credentials.password}`);

                if (!response.ok) {
                    throw new Error("Error en la autenticación");
                }
                const { access } = await response.json();

                console.log("Access", access)

                if (access) {
                    return { email: credentials.email, name: 'Nombre del usuario' };
                } else {
                    throw new Error("Error en la autenticación");
                }
                } catch (error) {
                    console.error("Error en la llamada fetch: ", error);
                    throw error;
                }
            }
        }),
        
    ],
    // secret: process.env.SECRET,
    pages: {
        signIn: "/login",
    },
};
