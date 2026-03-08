import { useState, useEffect } from "react";
import "./QuestionBox.css";

/**
 * Componente que muestra una pregunta con sus opciones.
 * Maneja la selección de respuesta, muestra feedback y avanza a la siguiente pregunta.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {{ question: string, answer: string, distractions: string[] }} props.questionData - Preguntas y opciones
 * @param {Function} props.onNextQuestion - Avanza a la siguiente pregunta
 * @param {boolean} props.isGameOver - Dice si el juego acaba
 * @param {(isCorrect: boolean) => void} props.onAnswer - Determina si la respuesta es correcta
 * @returns {JSX.Element} Elemento JSX que representa la pregunta y opciones.
 */

function QuestionBox({ questionData, onNextQuestion, isGameOver, onAnswer }) {

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); //Estado de respuesta
  const [isDisabled, setIsDisabled] = useState(false); //Estado de botones
  
  //Mezcla las opciones incorrectas y la respuesta correcta para cambiarlas de posición
  useEffect(() => {
    const shuffled = [...questionData.distractions]
      .sort(() => 0.5 - Math.random()) //Se mezclan las distracciones
      .slice(0, 2); //Agarra 2 opciones erróneas al azar

    const finalOptions = [questionData.answer, ...shuffled]
      .sort(() => 0.5 - Math.random()); //Mezcla las distracciones con la respuesta correcta

    setOptions(finalOptions);
    setSelectedOption(null);
    setFeedback(null);
    setIsDisabled(false);
  }, [questionData]);

  //Para manejar el click sobre un botón de opción
  const handleOptionClick = (option) => {
    if (isDisabled || isGameOver) return; //No hace nada si el juego acabó o si está deshabilitado
    
    setSelectedOption(option); //Setea la opción elegida
    setIsDisabled(true); //Deshabilita los demás botones
    
    const isCorrect = option === questionData.answer;

    onAnswer(isCorrect); //Hace callback con el resultado

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    // Espera 1 segundo para cambiar pregunta
    setTimeout(() => {
      if (!isGameOver) {
        onNextQuestion();
      }
    }, 1000);
  };

  return (
    <div>
      <div className="question-box">
        <span>{questionData.question}</span>
      </div>

      <div className="option-boxes">
        {options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => handleOptionClick(option)}
            disabled={isDisabled}
            className={selectedOption === option ? (feedback === 'correct' ? 'correct' : 'incorrect') : ''}
            style={{
              opacity: isDisabled && selectedOption !== option ? 0.5 : 1,
              cursor: isDisabled ? 'not-allowed' : 'pointer'
            }}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
      </div>
  );
}

export default QuestionBox;