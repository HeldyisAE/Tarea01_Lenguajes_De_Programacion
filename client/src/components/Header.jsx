import { useLocation } from 'react-router-dom'
import './Header.css'
import ResetButton from './ResetButton';
import PlayerTag from './PlayerTag';


export default function Header() {
    const location = useLocation()
    const isGame = location.pathname === "/game"

    return (
        <header className="header">
            <div className="header-left">
                <ResetButton />
            </div>
            <div className="header-center">
                <h2>Pregunta2</h2>
            </div>
            <div className="header-right">
                {isGame && <PlayerTag />}
            </div>
        </header>
    );
}
