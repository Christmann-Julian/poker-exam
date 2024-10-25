const suits = ["♠", "♥", "♦", "♣"];
const ranks = [
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

const cardDeck = suits.flatMap((suit) =>
  ranks.map((rank) => ({ suit, rank }))
);
 
export { cardDeck };