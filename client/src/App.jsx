import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./App.css";
import bgMusicFile from "./assets/Pregunta2__Soundtrack.m4a";

/**
 * Componente principal de la app
 * Define la navegación entre las páginas
 * Además reproduce la música de fondo
 * 
 * @returns {JSX.Element} Elemento JSX que representa el flujo de navegación
 */

function App() {
  const audioRef = useRef(null);

  //Inicia la música luego de que el usuario interactua con la web
  useEffect(() => {
    const startMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      document.removeEventListener("click", startMusic);
    };

    document.addEventListener("click", startMusic);
  }, []);

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={bgMusicFile} type="audio/mp3" />
      </audio>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;