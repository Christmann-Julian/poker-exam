import React from "react";
import Card from "./Card";
import { CardType } from '../type/types';

interface HandProps {
    cards: CardType[];
    title: string;
    handValue: string;
    score: number;
}
 
const Hand: React.FC<HandProps> = ({ cards, title, handValue, score }) => {
  return (
    <div className="p-4">
      <h4 className="font-medium text-white mb-1">Wins: {score}</h4>
      <h2 className="text-2xl mb-2 bg-white text-slate-900 font-medium px-3 py-2 rounded-md">
        {title}: <b>{handValue}</b>
      </h2>
      <div className="flex flex-col items-center sm:flex-row gap-1">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};
 
export default Hand;