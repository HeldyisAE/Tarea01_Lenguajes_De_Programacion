import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./App.css";
import bgMusicFile from "./assets/Pregunta2__Soundtrack.mp3";

/**
 * Componente principal de la app
 * Define la navegación entre las páginas
 * Además reproduce la música de fondo
 * 
 * @returns {JSX.Element} Elemento JSX que representa el flujo de navegación
 */

function App() {
  return (
    <>
      {/* Música de fondo, siempre activa */}
      <audio autoPlay loop>
        <source src={bgMusicFile} type="audio/mp3" />
        Tu navegador no soporta audio
      </audio>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;