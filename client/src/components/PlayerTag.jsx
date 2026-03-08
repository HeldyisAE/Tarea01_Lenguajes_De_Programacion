import "./PlayerTag.css"
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

/**
 * Componente visual que muestra el nombre del jugador
 * Utiliza el contexto de jugador para colocar el nombre introducido
 * 
 * @returns {JSX.Element} Elemento JSX que representa el componente
 */

function PlayerTag() {
const { playerName } = useContext(PlayerContext);

    return(
        <div className="player-tag" title="Jugador">
            <h2>{playerName}</h2>
        </div>
    );
}

export default PlayerTag;