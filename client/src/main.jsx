import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PlayerProvider } from './contexts/PlayerContext.jsx'
import './index.css'
import App from './App.jsx'

/**
 * Raiz de la apliación, punto de entrada
 * Monta la app en la raíz para renderizar
 * 
 * Además, maneja el envoltorio entre los contextos de jugador y navegación de páginas
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </BrowserRouter>
  </StrictMode>,
)
