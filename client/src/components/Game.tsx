import Hangman from './Hangman';
import Keyboard from './Keyboard';

const Game = () => {
  return (
    <div className="game">
      <Hangman />
      <Keyboard />
    </div>
  );
};

export default Game;
