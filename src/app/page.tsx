import Header from "@/components/ui/header/Header";
import zIndex from "@mui/material/styles/zIndex";
import Link from 'next/link';
import React from "react";
import "./landing.css"; // Importar el archivo CSS
import Footer from "@/components/ui/foter/foter";
import Head from "next/head";


const App: React.FC = () => {
  return (
   
     <>
      <Head>
          <script 
              async 
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8470945940628090"
              crossOrigin="anonymous"
          />
      </Head>
      <div className="App gradient-style">
      <div className="container-style">
        <div className="box-style">
          <h2 className="text-4xl font-bold mb-4">
            <div className="flex items-center">
              H Music
              <p className="disco ml-2">📀</p>
            </div>
          </h2>
          <p className="text-lg">Bienvenido a H Music, tu aplicación de música.</p>
          <p className="text-lg">Descubre decenas de canciones y disfruta de la música en cualquier momento y lugar.</p>
          <p className="text-lg">Con H Music, la música está siempre al alcance de tu mano.</p>
          <img src="/images/ejemplo.png" alt="imagen ejemplo" className="w-80 h-55 mt-4 rounded-lg imagen1" />
        </div>
        <div className="box-style2">
          <h2 className="text-4xl mb-4">Inicia tu experiencia ahora</h2>
          <p>Explora tus Generos preferidos</p>
          <p>Puntua y comenta las canciones</p>
          <p>Descubri nuevos artistas</p>
          <p>Comenza tu Experiencia..</p>
          <img src="/images/ejemplo2.png" alt="imagen ejemplo" className="w-80 h-55 mt-4 rounded-lg imagen2" />
          <Link href={"/home"} >
            <button className="border text-gray-50 mt-4 duration-300 relative group cursor-pointer overflow-hidden h-20 w-56 rounded-lg bg-neutral-800 p-4 font-extrabold hover:bg-yellow-500 hover:text-black boton">
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-700 right-12 top-12 bg-yellow-500"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150 duration-700 right-20 -top-6 bg-yellow-800"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8 rounded-full group-hover:scale-150 duration-700 right-32 top-6 bg-neutral-800"></div>
              <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4 rounded-full group-hover:scale-150 duration-700 right-2 top-12 bg-black"></div>
              <p className="z-10 absolute bottom-4 left-4 text-4xl">Iniciar</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
    <Footer companyName={"H music"} year={2024}></Footer>
    </>
  );
};

export default App;
