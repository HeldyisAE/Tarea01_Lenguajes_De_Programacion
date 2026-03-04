import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch('/api')
      .then(res => res.text())
      .then(data => setMsg(data));
  }, []);

  return <h1>{msg}</h1>;
}

export default App;
