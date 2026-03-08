import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../contexts/PlayerContext";
import Header from "../components/Header";
import InputName from "../components/InputName";
import StartButton from "../components/StartButton";
import HistoryPanel from "../components/HistoryPanel";
import "./Home.css"

/**
 * Componente lobby que recibe al jugador al ingresar a la web
 * Maneja la captura del nombre del jugador, inicia el juego y redirige al jugador al juego
 * 
 * @returns {JSX.Element} Elemento JSX que representa la pantalla lobby del juego
 */

function Home() {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");

  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const { setPlayerName } = useContext(PlayerContext);

  //Maneja la conexión con el servidor
  useEffect(() => {
    fetch("/api")
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  //Maneja el comportamiento al presionar el botón de start
  function handleStart() {
    if (name.trim() === "") { //Verificación por si el input está vacío
      alert("Debes ingresar un nombre");
      return;
    }

    //Setea el nombre del jugador y redirige a la pantalla de juego
    setPlayerName(name);
    navigate("/game");
  }

  return (
    <div className="container">
      <div className="top-container"> 
        <Header onOpenHistory={() => setShowHistory(true)} />
      </div>
      <div className="card">
        <div className="card-content">
          <InputName name={name} setName={setName}/>
          <StartButton onStart={handleStart} />
        </div>
      </div>
      <HistoryPanel isOpen={showHistory} onClose={() => setShowHistory(false)} />

    </div>

  )
}

export default Home;