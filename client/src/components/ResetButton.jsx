import { PiSpinnerBall } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import './ResetButton.css'

/**
 * Este componente visual representa un botón que cancela la partida
 * y devuelve al jugador al home
 * 
 * @returns {JSX.Element} Elemento JSX que representa el componente
 */

export default function ResetButton() {
    const navigate = useNavigate();

    //Regresa al jugador al home al dar click
    const handleReset = () => {
        navigate("/");
    };

  return(
        <button className="reset-button" onClick={handleReset} title="Ir a inicio">
            <div className="reset-button-logo">   
                <PiSpinnerBall size={48} />
            </div> 
        </button>
    );
}
