import "./StartButton.css"
import { VscDebugStart } from "react-icons/vsc";

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