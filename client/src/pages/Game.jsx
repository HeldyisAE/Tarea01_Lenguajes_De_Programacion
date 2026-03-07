import "./Game.css";
import QuestionBox from "../components/QuestionBox";
import Header from "../components/Header";
import OptionBoxes from "../components/OptionBoxes";

function Game() {
  return (
    <div classname="container">
      <div classname="top-container">
        <Header />
      </div>
      <div className="card">
        <div className="card-content">
          <QuestionBox />
          <OptionBoxes />
        </div>
      </div>
    </div>
  );
}

export default Game;
