import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            sub: string;
            provider: string;
            user: {
                id: string;
                image: string;
                name: string;
                email: string;
                password: string;
                rol: string;
                esta_verificado: boolean;
                verification_token: string;
            };
            
            token: string;
            id: string;
            iat: number;
            exp: number;
            jti: string;
        };
        expires: string;
    }
}