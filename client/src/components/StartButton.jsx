import "./StartButton.css"
import { VscDebugStart } from "react-icons/vsc";

function StartButton() {
    return(
        <div className="btn-content">
            <button className="start-button">
                <span>Iniciar Partida</span>
                <span className="icon">
                    <VscDebugStart />
                </span>
            </button>
        </div>
    );
}

export default StartButton;