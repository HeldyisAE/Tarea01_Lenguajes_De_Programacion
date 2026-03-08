import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./App.css";

/**
 * Componente principal de la app
 * Define la navegación entre las páginas
 * 
 * @returns {JSX.Element} Elemento JSX que representa el flujo de navegación
 */

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
  );
}

export default App;