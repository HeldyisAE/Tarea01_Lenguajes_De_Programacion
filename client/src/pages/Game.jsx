import "./Game.css";
import QuestionBox from "../components/QuestionBox";
import Header from "../components/Header";

function Game() {
  return (
    <div classname="container">
      <div classname="top-container">
        <Header />
      </div>
      <div className="card">
        <div className="card-content">
          <QuestionBox />
        </div>
      </div>
    </div>
  );
}

export default Game;
