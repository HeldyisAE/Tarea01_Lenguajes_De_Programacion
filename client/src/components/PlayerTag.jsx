import "./PlayerTag.css"
import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

function PlayerTag() {
const { playerName } = useContext(PlayerContext);

    return(
        <div className="player-tag" title="Jugador">
            <h2>{playerName}</h2>
        </div>
    );
}

export default PlayerTag;