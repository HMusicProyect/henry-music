import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            image: string;
            name: string;
            email: string;
            password: string;
            rol: string;
            esta_verificado: boolean;
            token: string;
            provider?: string; 
            jti?: string;
        };
    }
}