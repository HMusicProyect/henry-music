"use client"

import { useRouter } from "next/navigation";
import { twMerge } from 'tailwind-merge'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Home, Search } from 'lucide-react';
import React from 'react'
import Button from "./Button";
import { useSession, signOut } from 'next-auth/react'
import AuthButton from "@/components/auth-button";


interface HeaderProps{
    children: React.ReactNode;
    className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-yellow-500 p-6`, className)}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                    onClick={() => router.back()}
                    className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-175 transition">
                        <ChevronLeft className="text-white" size={35} />
                    </button>
                    <button 
                    onClick={() => router.forward()}
                    className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-175 transition">
                        <ChevronRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <Home className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <Search className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {session ? (
                        <>
                            <AuthButton 
                                page="/"
                            />
                        </>
                    ) : (
                        <>
                            <div className="">
                                <Button
                                    onClick={() => router.replace('/register')}
                                    className="bg-transparent text-neutral-white font-medium"
                                >
                                    Sign Up
                                </Button>
                            </div>
                            <div className="">
                                <Button
                                    onClick={() => router.replace('/login')}
                                    className="bg-white px-6 py-2"
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header;