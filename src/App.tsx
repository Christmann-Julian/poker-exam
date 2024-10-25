import React, { useState, useEffect } from 'react';
import { cardDeck } from './utils/CardDeck';
import Hands from './components/Hands';
import { CardType, ResultType, ScoreType } from './type/types';

function App() {
  const [gameDeck, setGameDeck] = useState<CardType[]>(cardDeck);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [result, setResult] = useState<ResultType>({ type: "", message: "" });
  const [newGame, setNewGame] = useState<boolean>(false);
  const [score, setScore] = useState<ScoreType>({ player: 0, dealer: 0 });

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
    setNewGame(false);
    setGameDeck(cardDeck);
  };

  const playerValue = ""
  const dealerValue = ""

  useEffect(() => {
    if (playerHand.length === 0 && dealerHand.length === 0) {
      setPlayerHand([getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck()]);
      setDealerHand([getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck()]);
    }
   
    if (gameOver) {
        
    }
  }, [playerHand, dealerHand, gameOver]);
   
  const handleGameOver = (result: ResultType) => {
    setGameOver(true);
    setResult(result);
    setNewGame(true);
  };

  return (
    <div className="h-screen bg-slate-900 container mx-auto p-4">
      <h1 className="text-4xl text-center text-white mb-4">Simple Poker</h1>
      <Hands
        playerHand={playerHand}
        dealerHand={dealerHand}
        playerValue={playerValue}
        dealerValue={dealerValue}
        score={score}
      />
    </div>
  );
}

export default App;
