import { useState, useEffect } from "react";
import Header from "../components/Header";

function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api")
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  return (
    <div classname="container">

      <div classname="top-container"> 
        <Header />
      </div>
      <div className="card">
        {/* Tarjetas de pregunta y respuesta */}
      </div>
    </div>

  )
}

export default Home;