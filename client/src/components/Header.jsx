import { useLocation } from 'react-router-dom'
import './Header.css'
import ResetButton from './ResetButton';
import PlayerTag from './PlayerTag';
import RecordButton from './RecButton';



export default function Header({ onOpenHistory }) {

    const location = useLocation()
    const isGame = location.pathname === "/game"
    const isHome = location.pathname === "/"

    return (
        <header className="header">
            <div className="header-left">
                <ResetButton />
            </div>
            <div className="header-center">
                <h2>Pregunta2</h2>
            </div>
            <div className="header-right">
                {isHome && <RecordButton onOpenHistory={onOpenHistory} />}

                {isGame && <PlayerTag />}
            </div>
        </header>
    );
}
