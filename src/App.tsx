import React, { useState } from 'react';
import { cardDeck } from './utils/CardDeck';
import Card from './components/Card';

function App() {
  const [gameDeck, setGameDeck] = useState(cardDeck)
  return (
    <>
      <Card card={{rank: "J", suit: "♠"}} />
      <Card card={{rank: "9", suit: "♠"}} />
      <Card card={{rank: "A", suit: "♥"}} />
    </>
  );
}

export default App;
