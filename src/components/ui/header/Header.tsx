"use client"

import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useRouter } from "next/navigation";
import { twMerge } from 'tailwind-merge'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Home, Search } from 'lucide-react';
import Button from "./Button";
import { useSession, signOut } from 'next-auth/react'
import AuthButton from "@/components/auth/auth-button";
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios"

interface HeaderProps{
    children: React.ReactNode;
    className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const [message, setMessage] = useState("");

    function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
    }

    const handleSignOut = async () => {
        try {
        // Cerrar sesión utilizando NextAuth
        await signOut();

        } catch (error) {
        setMessage('Error al cerrar sesión:');
        }
    };


    const handlePremium = async () => {
        try {
          const response = await axios.post('http://localhost:3001/pay', {
           //enviar el usuario que hace el pago
          });
          
          console.log('Respuesta:', response.data);

          window.location.href = response.data.url
        } catch (error) {
          // Si ocurre un error durante la solicitud, puedes manejarlo aquí
          console.error('Error:', error);
        }
      };


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
                            <Menu as="div" className="relative ml-3 bg-gradient-to-b from-transparent to-black rounded-full">
                                <div>
                                <Menu.Button className="relative m-1 flex rounded-full bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <Image
                                        className="h-10 w-10 rounded-full"
                                        src={'/images/img-perfil-padron.jpg'}
                                        alt="img perfil"
                                        width={40}
                                        height={40}
                                    />
                                </Menu.Button>
                                </div>
                                <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                        href={`/userProfile`}
                                        className={
                                            classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                        Perfil
                                        </Link>
                                    )}
                                    </Menu.Item>
                                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          onClick={handlePremium}
                        >
                          Premium
                        </Link>
                      )}
                    </Menu.Item>
            {/* 

                                    <Menu.Item>
                                    {({ active }) => (
                                        <a
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                        Opções
                                        </a>
                                    )}
                                    </Menu.Item>
                                    
                                    */}
                                    <Menu.Item>
                                    {({ active }) => (
                                        <Link
                                        href="#"
                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        onClick={handleSignOut}
                                        >
                                        Sair
                                        </Link>
                                    )}
                                    </Menu.Item>
                                </Menu.Items>
                                </Transition>
                            </Menu>
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