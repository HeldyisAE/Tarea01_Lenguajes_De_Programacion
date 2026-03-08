import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../contexts/PlayerContext";
import Header from "../components/Header";
import InputName from "../components/InputName";
import StartButton from "../components/StartButton";
import HistoryPanel from "../components/HistoryPanel";

import "./Home.css"

function Home() {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");

  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const { setPlayerName } = useContext(PlayerContext);

  useEffect(() => {
    fetch("/api")
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  function handleStart() {
    if (name.trim() === "") {
      alert("Debes ingresar un nombre");
      return;
    }

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