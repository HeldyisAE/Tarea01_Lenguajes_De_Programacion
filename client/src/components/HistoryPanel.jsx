import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./HistoryPanel.css";

function HistoryPanel({ isOpen, onClose }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/games");
        if (!response.ok) {
          throw new Error("Error al cargar el historial");
        }
        const data = await response.json();
        setGames(data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-panel" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} title="Cerrar">
          <IoClose size={24} color="#ff0000" />
        </button>

        <h2>Historial de Partidas</h2>

        {loading && <p className="loading">Cargando historial...</p>}
        {error && <p className="error">Error: {error}</p>}

        {!loading && !error && games.length === 0 && (
          <p className="no-games">No hay partidas registradas aún</p>
        )}

        {!loading && !error && games.length > 0 && (
          <div className="games-table">
            <table>
              <thead>
                <tr>
                  <th>Jugador</th>
                  <th>Puntuación</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game, index) => (
                  <tr key={index} className={game.result === "win" ? "win" : "lose"}>
                    <td>{game.player}</td>
                    <td>{game.score} / 10</td>
                    <td className={`result-${game.result}`}>
                      {game.result === "win" ? "✓ Ganó" : "✗ Perdió"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPanel;
