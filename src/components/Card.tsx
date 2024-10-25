import React from "react";

interface CardProps {
  card: {
    rank: string;
    suit: string;
  };
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  return (
    <div className={`w-32 h-40 bg-red-700 border rounded-lg shadow-md flex flex-col items-center  justify-items-start text-xl text-red-700 flip-card poker-delay-${index}`}>
      <p className="flex justify-end">{card.rank}</p>
      <h1 className="text-6xl">{card.suit}</h1>
    </div>
  );
};
 
export default Card;