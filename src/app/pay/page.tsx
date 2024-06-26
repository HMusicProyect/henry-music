"use client"

import Link from 'next/link';
import React, { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import useStore from '@/store/actions/modifyRol';

const Pay = () => {

const {data: session} = useSession();
const email = session?.user?.email;

const { modifyRole } = useStore();

useEffect(() => {
  if (email) {
    modifyRole(email)
  }
}, [email, modifyRole]);

  const handleSignOut = async () => {
try {
  const callbackUrl = "/login"
  await signOut({callbackUrl})
} catch (error) {
  console.error("error duarante cierre de sesion",error)
}
  }


  return (
    <div className="flex justify-center items-center h-screen">
    <div className="transform transition duration-300 hover:scale-110 rounded-lg shadow-lg h-72 w-80 hover:shadow-xl bg-white flex flex-col justify-between">
      <div className="bg-cover h-3/4 rounded-t-lg" style={{backgroundImage: "url('https://imagenes.20minutos.es/files/image_1920_1080/uploads/imagenes/2021/12/02/spotify.png')"}}>
      </div>
  
      <div className="px-5 pt-2 flex flex-col text-black">
        <h2 className="font-semibold text-xl">Ya Eres Premium</h2>
  
        <Link href="/login">
        <button
          onClick={handleSignOut}
          className="bg-blue-500 cursor-pointer text-white px-4 py-2 mt-2 rounded-md transition duration-150 hover:bg-blue-700 mb-3"
          type="button"
        >
          Login
        </button>
        </Link>
      </div>
    </div>
  </div>
  
  );
};

export default Pay;
