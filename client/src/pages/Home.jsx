import { useState, useEffect } from "react";
import Header from "../components/Header";
import InputName from "../components/InputName";
import StartButton from "../components/StartButton";
import "./Home.css"

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
        <div className="card-content">
          <InputName />
          <StartButton />
        </div>
      </div>
    </div>

  )
}

export default Home;