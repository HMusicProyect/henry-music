import nextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role: string | undefined;
            domain: string | undefined;
        };
    }

    interface User {
        role: string | undefined;
        domain: string | undefined;
    };
}