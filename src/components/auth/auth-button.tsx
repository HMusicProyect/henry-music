"use client";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const handleSignOut = async () => {
    try {
    // Cerrar sesión utilizando NextAuth
    await signOut({ callbackUrl: "/login" });

    } catch (error) {
    console.error('Error al cerrar sesión:', error);
    }
};

export default function AuthButton({ page }: { page: string }) {
    const { data: session, status } = useSession();
    const isAuthenticated = status === "authenticated";
    const router = useRouter();
    if(session){
        router.push('/home');
    }



    return (
        <>
            <Link
                href={page === "register" ? "/login" : "register"}
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8"
                )}
            >
                {page === "register" ? "Entrar" : "Criar Conta"}
            </Link>
        </>
    );
}