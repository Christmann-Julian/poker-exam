import React from 'react';

interface ControlProps {
  resetGame: () => void;
  confirmHand: () => void;
  changeCard1: () => void;
  changeCard2: () => void;
  changeCard3: () => void;
  changeCard4: () => void;
  gameOver: boolean;
}

const Control: React.FC<ControlProps> = ({ resetGame, confirmHand, gameOver, changeCard1, changeCard2, changeCard3, changeCard4 }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {gameOver ? (
        <button
          onClick={resetGame}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Restart
        </button>
      ) : (
        <>
          <button
            onClick={changeCard1}
            className="bg-green-800 text-white px-4 py-2 rounded"
          >
            Change Card 1
          </button>
          <button
            onClick={changeCard2}
            className="bg-green-800 text-white px-4 py-2 rounded"
          >
            Change Card 2
          </button>
          <button
            onClick={changeCard3}
            className="bg-green-800 text-white px-4 py-2 rounded"
          >
            Change Card 3
          </button>
          <button
            onClick={changeCard4}
            className="bg-green-800 text-white px-4 py-2 rounded"
          >
            Change Card 4
          </button>
          <button
            onClick={confirmHand}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Confirm Hand
          </button>
        </>
      )}
    </div>
  );
};

export default Control;