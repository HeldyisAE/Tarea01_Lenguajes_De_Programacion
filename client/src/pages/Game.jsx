import "./Game.css";
import { useState, useEffect, useContext } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import QuestionBox from "../components/QuestionBox";
import Header from "../components/Header";
import { PlayerContext } from "../contexts/PlayerContext";

/**
 * Componente principal del juego
 * Maneja la lógica del juego cargando preguntas, opciones, conteo de aciertos,
 * reinicio y almacenamiento de partidas
 * 
 * @returns {JSX.Element} Elemento JSX que representa el componente de juego
 */

function Game() {
  const { playerName } = useContext(PlayerContext);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(true); //Estado de carga
  const [error, setError] = useState(null); //Estado de error en fetch
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;
  const [score, setScore] = useState(0);
  const [questionsUsed, setQuestionsUsed] = useState([]);

  //Carga las preguntas del json en el server hasta el frontend
  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestionsData(data);
        const randomIndex = Math.floor(Math.random() * data.questions.length); // Random de pregunta
        //Manejo de preguntas para evitar repeticiones
        setCurrentIndex(randomIndex);
        setQuestionsUsed([randomIndex]);
        setQuestionCount(1); //Conteo de preguntas
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  //Guarda la partida en la base de datos de firebase
  const saveGame = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          player: playerName,
          score: score,
          result: score >= 6 ? "win" : "lose"
        })
      });

      if (!response.ok) {
        throw new Error("Error al guardar la partida");
      }

      const data = await response.json();
      console.log("Partida guardada:", data);
    } catch (error) {
      console.error("Error guardando la partida:", error);
    }
  };

  //Avanza a la siguiente pregunta
  const handleNextQuestion = () => {
    if (!questionsData) return;

    if (questionCount < MAX_QUESTIONS) {
      let randomIndex;

      do {
        randomIndex = Math.floor(
          Math.random() * questionsData.questions.length,
        );
      } while (questionsUsed.includes(randomIndex));

      setQuestionsUsed((prev) => [...prev, randomIndex]); //Pregunta usada
      setCurrentIndex(randomIndex); //Actualiza la pregunta
    }

    setQuestionCount((prev) => prev + 1);
  };

  //Reinicia el juego una vez acabado
  const restartGame = () => {
    if(!questionsData) return;

    const randomIndex = Math.floor(
      Math.random() * questionsData.questions.length
    );

    //Resetea los estados
    setScore(0);
    setQuestionCount(1);
    setQuestionsUsed([]);
    setQuestionsUsed([randomIndex]);
    setCurrentIndex(randomIndex);
  }

  const isGameOver = questionCount > MAX_QUESTIONS; //Booleando que dice si el juego terminó

  // Llama a saveGame cuando el juego termina
  useEffect(() => {
    if (isGameOver && score > 0) {
      saveGame();
    }
  }, [isGameOver]);
  
  //Estados de carga
  if (loading) return <div>Cargando preguntas...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!questionsData || currentIndex === null) return <div>No hay preguntas disponibles</div>;

  const win = score >= 6; //Condición de victoria

  return (
    <div className="container">
      <div className="top-container">
        <Header />
      </div>
      <div className="card">
        <div className="card-content">
          {!isGameOver && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "2vh",
                color: "white",
              }}
            >
              Pregunta {questionCount} de {MAX_QUESTIONS}
            </div>
          )}
          {!isGameOver ? (
            <QuestionBox
              questionData={questionsData.questions[currentIndex]}
              onNextQuestion={handleNextQuestion}
              onAnswer={(isCorrect) => {
                if (isCorrect) {
                  setScore((prev) => prev + 1);
                }
              }}
              isGameOver={isGameOver}
            />
          ) : (
            <div className="endgame-card">
              <h2>Juego terminado</h2>
              <p>
                Aciertos: {score} / {MAX_QUESTIONS}
              </p>
              <p>{win ? "¡Ganaste!" : "Perdiste :("}</p>
              <button className="restart-button" onClick={restartGame} title="Volver a jugar">
                <div className="restart-icon">
                  <VscDebugRestart />
                </div>  
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
