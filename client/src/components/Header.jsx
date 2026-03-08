import { useLocation } from 'react-router-dom'
import './Header.css'
import ResetButton from './ResetButton';
import PlayerTag from './PlayerTag';
import RecordButton from './RecButton';


/**
 * Componente visual en la parte superior de la pantalla
 * Cambia algunos elementos en la parte derecha dependiendo de la dirección
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.OpenHistory - Es la función para abrir el historial 
 * @returns {JSX.Element} Elemento JSX que representa el componente
 */
export default function Header({ onOpenHistory }) {

    /* Obtiene la dirección actual */
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
                {/* Se elige el elemento a mostrar dependiendo de la dirección */}
                {isHome && <RecordButton onOpenHistory={onOpenHistory} />}
                {isGame && <PlayerTag />}
            </div>
        </header>
    );
}
