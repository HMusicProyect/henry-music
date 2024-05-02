import "next-auth";

declare module "next-auth" {
    interface Session {
        provider: string;
        user: {
                sub: string;
                id: string;
                image: string;
                name: string;
                email: string;
                password: string;
                rol: string;
                token: string;
                expires: string;
            };
    }
}