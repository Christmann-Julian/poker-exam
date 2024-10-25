import React, { useState, useEffect } from 'react';
import { cardDeck } from './utils/cardDeck';
import { evaluateHand } from './utils/evaluateHand';
import Hands from './components/Hands';
import Result from './components/Result';
import { CardType, ResultType, ScoreType } from './type/types';

function App() {
  const [gameDeck, setGameDeck] = useState<CardType[]>(cardDeck);
  const [playerHand, setPlayerHand] = useState<CardType[]>([]);
  const [dealerHand, setDealerHand] = useState<CardType[]>([]);
  const [playerValue, setPlayerValue] = useState<string>("");
  const [dealerValue, setDealerValue] = useState<string>("");
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

  useEffect(() => {
    if (playerHand.length === 0 && dealerHand.length === 0) {
      setPlayerHand([getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck()]);
      setDealerHand([getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck(), getRandomCardFromDeck()]);
    }
   
    if (gameOver) {
        
    }
  }, [gameOver]);

  useEffect(() => {
    const { type: playerType, value: playerValueEvaluation } = evaluateHand(playerHand);
    const { type: dealerType, value: dealerValueEvaluation } = evaluateHand(dealerHand);

    setPlayerValue(playerType ? playerType + " : " + playerValueEvaluation : "");
    setDealerValue(dealerType ? dealerType + " : " + dealerValueEvaluation : "");

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
      handleGameOver({ type: "player", message: "Player wins!" });
      setScore({ ...score, player: score.player + 1 });
    } else if (playerHandNote < dealerHandNote) {
      handleGameOver({ type: "dealer", message: "Dealer wins!" });
      setScore({ ...score, dealer: score.dealer + 1 });
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
        handleGameOver({ type: "player", message: "Player wins!" });
        setScore({ ...score, player: score.player + 1 });
      } else if (playerRanks < dealerRanks) {
        handleGameOver({ type: "dealer", message: "Dealer wins!" });
        setScore({ ...score, dealer: score.dealer + 1 });
      } else {
        handleGameOver({ type: "draw", message: "Draw!" });
      }
    }
    
  }, [playerHand]);
   
  const handleGameOver = (result: ResultType) => {
    setGameOver(true);
    setResult(result);
    setNewGame(true);
  };

  return (
    <div className="h-screen bg-slate-900 container mx-auto p-4">
      <h1 className="text-4xl text-center text-white mb-4">Simple Poker</h1>
      <Result result={result} />
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
