import Header from "@/components/ui/header/Header";
import zIndex from "@mui/material/styles/zIndex";
import Link from 'next/link';
import React from "react";


const App: React.FC = () => {
    const gradientStyle = {
        background: "linear-gradient(to bottom, #FFD700, #4a3e01, #000)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      };
    
      const containerStyle = {
        display: "flex",
        gap: "0px",
        width: "1200px", // Ajustar el ancho del contenedor
        height: "500px",
      };
    
      const boxStyle = {
        flex: "1",
        backgroundColor: "#000",
        borderRadius: "20px 0px 0px 20px",
        padding: "40px",
        fontSize: "24px",
        marginTop: "-20px",
      };
      const boxStyle2 = {
        flex: "1",
        backgroundColor: "#181818 ",
        borderRadius: "0px 20px 20px 0px",
        padding: "40px",
        fontSize: "19px",
        with:"600px",
        marginTop: "-20px",
      };
      const discoKeyframes = `
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
const imagen2 = {
  marginLeft:"200px"
};

const boton = {
  zIndex: 10,
  transform: 'translateX(-154px)',
  marginTop: '-140px',
  border:"none"
};

const disco = {
  fontSize: "40px",
  animation: "rotate 5s linear infinite",
};
  return (
    <div className="App" style={gradientStyle}>
      <div style={containerStyle}>
      <div style={boxStyle}>
      <h2 className="text-4xl font-bold mb-4">
  <style>{discoKeyframes}</style>
  <div className="flex items-center">
    H Music 
    <p style={disco} className="ml-2">📀</p>
  </div>
</h2>

          <p className="text-lg">Bienvenido a H Music, tu aplicación de música.</p>
          <p className="text-lg">Descubre decenas de canciones y disfruta de la música en cualquier momento y lugar.</p>
          <p className="text-lg">Con H Music, la música está siempre al alcance de tu mano.</p>
          <img src="/images/ejemplo.png" alt="imagen ejemplo" className="w-80 h-55 mt-4 rounded-lg" />

        </div>
        <div style={boxStyle2}>
          
          <h2 className="text-4xl mb-4">Inicia tu experiencia ahora</h2>
          <p>Explora tus Generos preferidos</p>
          <p>Puntua y comenta las canciones</p>
          <p>Descubri nuevos artistas</p>
          <p>Comenza tu Experiencia..</p>
          <img src="/images/ejemplo2.png" alt="imagen ejemplo" className="w-80 h-55 mt-4 rounded-lg" style={imagen2} />
          <Link href={"/home"} >
          <button className="border text-gray-50 mt-4 duration-300 relative group cursor-pointer overflow-hidden h-20 w-56 rounded-lg bg-neutral-800 p-4 font-extrabold hover:bg-yellow-500 hover:text-black" style={boton}>
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
  );
};

export default App;
