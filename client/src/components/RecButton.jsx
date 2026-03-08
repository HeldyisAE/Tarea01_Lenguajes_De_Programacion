import { TbHistory } from "react-icons/tb";
import "./RecButton.css"

function RecordButton({ onOpenHistory }) {

    return(
        <button className="record-button" onClick={onOpenHistory} title="Historial">
            <div className="record-icon">
                <TbHistory size={48}/>
            </div>
        </button>
    );
}

export default RecordButton;