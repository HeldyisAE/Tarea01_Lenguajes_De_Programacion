import "./Game.css";
import { useState, useEffect } from "react";
import QuestionBox from "../components/QuestionBox";
import Header from "../components/Header";


function Game() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [questionsData, setQuestionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const MAX_QUESTIONS = 10;

  useEffect(() => {
    fetch("http://localhost:3000/api/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestionsData(data);
        // Random de pregunta
        const randomIndex = Math.floor(Math.random() * data.questions.length);
        setCurrentIndex(randomIndex);
        setQuestionCount(1);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleNextQuestion = () => {
    if (!questionsData) return;

    if (questionCount < MAX_QUESTIONS) {
      const randomIndex = Math.floor(
        Math.random() * questionsData.questions.length,
      );
      setCurrentIndex(randomIndex);
      
    }

    setQuestionCount((prev) => prev + 1);
  };

  if (loading) return <div>Cargando preguntas...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!questionsData || currentIndex === null) return <div>No hay preguntas disponibles</div>;

  const isGameOver = questionCount > MAX_QUESTIONS;

  return (
    <div className="container">
      <div className="top-container">
        <Header />
      </div>
      <div className="card">
        <div className="card-content">
          {!isGameOver && (
            <div style={{textAlign: 'center', marginBottom: '2vh', color: 'white'}}>
              Pregunta {questionCount} de {MAX_QUESTIONS}
            </div>
          )}
          {!isGameOver ? (
            <QuestionBox 
              questionData={questionsData.questions[currentIndex]} 
              onNextQuestion={handleNextQuestion}
              isGameOver={isGameOver}
            />
          ) : (
            <div style={{textAlign: 'center', color: 'white', fontSize: '1.5rem', padding: '2vh', marginTop: '15vh'}}>
              ¡Has completado los 10 preguntas! Juego finalizado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
