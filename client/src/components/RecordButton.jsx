import { TbHistory } from "react-icons/tb";
import "./RecordButton.css"

function RecordButton() {

    return(
        <button className="record-button">
            <div className="record-icon">
                <TbHistory size={48}/>
            </div>
        </button>
    );
}

export default RecordButton;