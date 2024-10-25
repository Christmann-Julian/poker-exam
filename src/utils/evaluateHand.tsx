import { CardType } from '../type/types';

type HandEvaluation = {
  type: string;
  value: string | null;
};

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

export const evaluateHand = (hand: CardType[]): HandEvaluation => {
  const rankCount: { [key: string]: number } = {};
  
  hand.forEach(card => {
    rankCount[card.rank] = (rankCount[card.rank] || 0) + 1;
  });
  
  const counts = Object.values(rankCount);
  const rankValues = Object.keys(rankCount);
  
  if (counts.includes(4)) {
    const value = rankValues.find(rank => rankCount[rank] === 4) ?? null;
    return { type: 'Quads', value };
  }
  if (counts.includes(3)) {
    const value = rankValues.find(rank => rankCount[rank] === 3) ?? null;
    return { type: 'Trips', value };
  }
  if (counts.filter(count => count === 2).length === 2) {
    const values = rankValues.filter(rank => rankCount[rank] === 2) ?? null;
    return { type: 'Two Pair', value: values.join('|') };
  }
  if (counts.includes(2)) {
    const value = rankValues.find(rank => rankCount[rank] === 2) ?? null;
    return { type: 'Pair', value };
  }

  const highCard = rankValues.sort((a, b) => ranks[b] - ranks[a])[0];
  return { type: 'High Card', value: highCard };
};