import React from 'react';

interface ControlProps {
  resetGame: () => void;
  confirmHand: () => void;
  lockCard1: () => void;
  lockCard2: () => void;
  lockCard3: () => void;
  lockCard4: () => void;
  confirmLockCards: () => void;
  gameOver: boolean;
  lockedCards: boolean[];
  maxChangeCount: number;
}

const Control: React.FC<ControlProps> = ({ resetGame, confirmHand, gameOver, lockCard1, lockCard2, lockCard3, lockCard4, lockedCards, confirmLockCards, maxChangeCount }) => {
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
          {maxChangeCount >= 3 ? (
            <span className="text-white px-4 py-2">You have made the maximum change</span>
          ) : (
            <>
              <button
                onClick={lockCard1}
                className={`px-4 py-2 rounded ${lockedCards[0] ? 'bg-gray-500' : 'bg-green-800'} text-white`}
              >
                {lockedCards[0] ? 'Unlock Card 1' : 'Lock Card 1'}
              </button>
              <button
                onClick={lockCard2}
                className={`px-4 py-2 rounded ${lockedCards[1] ? 'bg-gray-500' : 'bg-green-800'} text-white`}
              >
                {lockedCards[1] ? 'Unlock Card 2' : 'Lock Card 2'}
              </button>
              <button
                onClick={lockCard3}
                className={`px-4 py-2 rounded ${lockedCards[2] ? 'bg-gray-500' : 'bg-green-800'} text-white`}
              >
                {lockedCards[2] ? 'Unlock Card 3' : 'Lock Card 3'}
              </button>
              <button
                onClick={lockCard4}
                className={`px-4 py-2 rounded ${lockedCards[3] ? 'bg-gray-500' : 'bg-green-800'} text-white`}
              >
                {lockedCards[3] ? 'Unlock Card 4' : 'Lock Card 4'}
              </button>
              <button
                onClick={confirmLockCards}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Confirm lock Cards
              </button>
          </>
          )}
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