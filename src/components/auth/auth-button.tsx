"use client";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function AuthButton({ page }: { page: string }) {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";

    const handleSignOut = async () => {
        try {
        // Cerrar sesión utilizando NextAuth
        await signOut({ callbackUrl: "/login" });

        } catch (error) {
        console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <>
        {!isAuthenticated ? (
            <Link
                href={page === "register" ? "/login" : "register"}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
            {page === "register" ? "Entrar" : "Criar Conta"}
            </Link>
        ) : (
            <Button
            onClick={handleSignOut}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "right-4 top-4 md:right-8 md:top-8"
            )}
            >
            Sign Out
            </Button>
        )}
        </>
    );
}