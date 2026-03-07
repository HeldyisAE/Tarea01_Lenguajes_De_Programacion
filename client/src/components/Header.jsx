import './Header.css'
import ResetButton from './ResetButton';

export default function Header() {
    return (
        <header className="header">
            <div className="header-left">
                <ResetButton />
            </div>
            <div className="header-center">
                <h2>Pregunta2</h2>
            </div>
            <div className="header-right">

            </div>
        </header>
    );
}
