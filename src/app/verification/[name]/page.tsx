"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Verification = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [isFetchSuccessful, setIsFetchSuccessful] = useState(false);

  useEffect(() => {
    if(id == null || token == null) {
      setMessage('Verifique su email para autenticar su cuenta');
    } else {
      if (id && token) {
  
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/verification/changeStatus`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, token }),
        })
        .then(response => response.json())
        .then(data => {
          setMessage('Usuario autenticado con éxito');
          setIsFetchSuccessful(true);
        })
        .catch((error) => {
          setMessage('Error al autenticar');
          setIsFetchSuccessful(false);
        });
      }
    }


  }, [id, token]);

  const handleLoginRedirect = () => {
    router.push('/login');
  };
  

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="mb-4 text-2xl font-bold text-gray-900">
      Verificação
    </h1>
    <p className="mb-4 text-lg text-gray-700">
      {message}
    </p>
    {isFetchSuccessful && 
      <button 
        onClick={handleLoginRedirect}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Ir a Login
      </button>}
  </div>
  );
}

export default Verification;