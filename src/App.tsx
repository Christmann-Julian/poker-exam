import React, { useState, useEffect } from 'react';
import { cardDeck } from './utils/cardDeck';
import { evaluateHand } from './utils/evaluateHand';
import Hands from './components/Hands';
import Result from './components/Result';
import Control from './components/Control';
import { CardType, ResultType } from './type/types';

function App() {
  const [gameDeck, setGameDeck] = useState<CardType[]>(cardDeck);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [playerValue, setPlayerValue] = useState<string>("");
  const [dealerValue, setDealerValue] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType>({ type: "", message: "" });
  const [changeCount, setChangeCount] = useState<number>(0);
  const [lockedCards, setLockedCards] = useState<boolean[]>([false, false, false, false]);

  const getRandomCardFromDeck = () => {
    const randomIndex = Math.floor(Math.random() * gameDeck.length);
    const card = gameDeck[randomIndex];
    const newDeck = gameDeck.filter((_, index) => index !== randomIndex);
    setGameDeck(newDeck);
    return card;
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameOver(false);
    setResult({ type: "", message: "" });
    setGameDeck(cardDeck);
    setChangeCount(0);
    setLockedCards([false, false, false, false]);
  };

  const confirmLockCards = () => {
    for (let i = 0; i < playerHand.length; i++) {
      if (!lockedCards[i]) {
        changeCard(i);
      }
    }
    setChangeCount(prevCount => prevCount + 1);
  };

  const changeCard = (index?: number) => {
    if (index !== undefined) {
      if (changeCount <= 3 && !lockedCards[index]) {
        const newCard = getRandomCardFromDeck();
        setPlayerHand(prevHand => {
          const newHand = [...prevHand];
          newHand[index] = newCard;
          return newHand;
        });
      }
    } else {
      setPlayerHand(prevHand => {
        const newHand = prevHand.map((card, i) => {
          if (!lockedCards[i]) {
            return getRandomCardFromDeck();
          }
          return card;
        });
        return newHand;
      });
    }
  };

  const toggleLockCard = (index: number) => {
    setLockedCards(prevLocked => {
      const newLocked = [...prevLocked];
      newLocked[index] = !newLocked[index];
      return newLocked;
    });
  };
  
  const lockCard1 = () => toggleLockCard(0);
  const lockCard2 = () => toggleLockCard(1);
  const lockCard3 = () => toggleLockCard(2);
  const lockCard4 = () => toggleLockCard(3);

  useEffect(() => {
    if (playerHand.length === 0 && dealerHand.length === 0) {
      setPlayerHand([getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck()]);
      setDealerHand([getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck()]);
    }
  }, [gameOver]);

  useEffect(() => {
    const { type: playerType, value: playerValueEvaluation } = evaluateHand(playerHand);
    const { type: dealerType, value: dealerValueEvaluation } = evaluateHand(dealerHand);

    const tempPlayerValue = playerType ? playerType + " : " + playerValueEvaluation : "";
    const tempDealerValue = dealerType ? dealerType + " : " + dealerValueEvaluation : "";

    setPlayerValue(tempPlayerValue);
    setDealerValue(tempDealerValue);

    const handNote: { [key: string]: number } = {
      "High Card": 1,
      "Pair": 2,
      "Two Pair": 3,
      "Trips": 4,
      "Quads": 5,
    };

    const playerHandNote = playerType ? handNote[playerType] : 0;
    const dealerHandNote = dealerType ? handNote[dealerType] : 0;

    if (playerHandNote > dealerHandNote) {
      setResult({ type: "player", message: "Player wins with " + tempPlayerValue });
    } else if (playerHandNote < dealerHandNote) {
      setResult({ type: "dealer", message: "Dealer wins with " + tempDealerValue });
    } else {
      const ranks: { [key: string]: number } = {
        "7": 7,
        "8": 8,
        "9": 9,
        "10": 10,
        "J": 11,
        "Q": 12,
        "K": 13,
        "A": 14,
      };
      const playerRanks = ranks[playerValueEvaluation ?? ""] ?? 0;
      const dealerRanks = ranks[dealerValueEvaluation ?? ""] ?? 0;

      if (playerRanks > dealerRanks) {
        setResult({ type: "player", message: "Player wins with " + tempPlayerValue });
      } else if (playerRanks < dealerRanks) {
        setResult({ type: "dealer", message: "Dealer wins with " + tempDealerValue });
      } else {
        setResult({ type: "draw", message: "Draw!" });
      }
    }
    
  }, [playerHand]);
   
  const confirmHand = () => {
    setGameOver(true);
  };

  return (
    <div className="h-screen bg-slate-900 container mx-auto p-4">
      <h1 className="text-4xl text-center text-white mb-4">Simple Poker</h1>
      {gameOver && <Result result={result} />}
      <Hands
        playerHand={playerHand}
        dealerHand={dealerHand}
        playerValue={playerValue}
        dealerValue={dealerValue}
      />
      <Control 
        resetGame={resetGame} 
        confirmHand={confirmHand} 
        gameOver={gameOver} 
        lockCard1={lockCard1} 
        lockCard2={lockCard2} 
        lockCard3={lockCard3} 
        lockCard4={lockCard4} 
        lockedCards={lockedCards}
        confirmLockCards={confirmLockCards}
        maxChangeCount={changeCount}
      />
    </div>
  );
}

export default App;
