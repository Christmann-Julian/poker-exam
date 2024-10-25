import React from 'react';

interface ControlProps {
  resetGame: () => void;
  confirmHand: () => void;
}

const Control: React.FC<ControlProps> = ({ resetGame, confirmHand }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        onClick={confirmHand}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirm Hand
      </button>
      <button
        onClick={resetGame}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Restart
      </button>
    </div>
  );
};

export default Control;