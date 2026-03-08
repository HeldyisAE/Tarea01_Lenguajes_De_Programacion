import { PiSpinnerBall } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import './ResetButton.css'

export default function ResetButton() {
    const navigate = useNavigate();

    const handleReset = () => {
        navigate("/");
    };

  return(
        <button className="reset-button" onClick={handleReset}>
            <div className="reset-button-logo">   
                <PiSpinnerBall size={48} />
            </div> 
        </button>
    );
}
