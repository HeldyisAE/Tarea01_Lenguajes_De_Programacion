import { TbHistory } from "react-icons/tb";
import "./RecButton.css"

/**
 * Este componente visual representa un botón que despliega el historial de partidas
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} onOpenHistory - Define si el historial se despliega 
 * @returns {JSX.Element} Elemento JSX que representa el componente
 */

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