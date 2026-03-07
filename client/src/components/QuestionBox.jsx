import { useState, useEffect } from "react";
import "./QuestionBox.css";

function QuestionBox({ questionData, onNextQuestion, isGameOver }) {

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const shuffled = [...questionData.distractions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    const finalOptions = [questionData.answer, ...shuffled]
      .sort(() => 0.5 - Math.random());

    setOptions(finalOptions);
    setSelectedOption(null);
    setFeedback(null);
    setIsDisabled(false);
  }, [questionData]);

  const handleOptionClick = (option) => {
    if (isDisabled || isGameOver) return;
    
    setSelectedOption(option);
    setIsDisabled(true);
    
    const isCorrect = option === questionData.answer;
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