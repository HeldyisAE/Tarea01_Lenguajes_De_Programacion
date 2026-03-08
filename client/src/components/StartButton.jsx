import "./StartButton.css"
import { VscDebugStart } from "react-icons/vsc";

/**
 * Componente visual que representa el botón para iniciar el juego
 *  
 * @param {Object} props - Propiedades del sistema
 * @param {Function} onStart - Define la acción al click 
 * @returns {JSX.Element} Elemento JSX que representa al componente
 */

function StartButton({ onStart }) {
    return(
        <div className="btn-content">
            <button className="start-button" onClick={onStart}>
                <span>Iniciar Partida</span>
                <span className="icon">
                    <VscDebugStart />
                </span>
            </button>
        </div>
    );
}

export default StartButton;