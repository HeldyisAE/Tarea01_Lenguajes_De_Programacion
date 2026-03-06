import { RxReset } from "react-icons/rx";
import './ResetButton.css'

export default function ResetButton() {
  return(
        <button className="reset-button">
            <div className="reset-button-logo">   
                <RxReset size={48} />
            </div> 
        </button>
    );
}
