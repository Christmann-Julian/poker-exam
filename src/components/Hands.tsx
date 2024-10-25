import React from "react";
import Hand from "./Hand";
import { CardType, ScoreType } from '../type/types';

export interface HandsProps {
    playerHand: CardType[];
    dealerHand: CardType[];
    playerValue: string;
    dealerValue: string;
    score: ScoreType;
}

const Hands: React.FC<HandsProps> = ({ playerHand, dealerHand, playerValue, dealerValue, score,}) => {
  return (
    <div className="flex justify-around">
      <Hand
        cards={playerHand}
        title="Player's Hand"
        handValue={playerValue}
        score={score.player}
      />
      <Hand
        cards={dealerHand}
        title="Dealer's Hand"
        handValue={dealerValue}
        score={score.dealer}
      />
    </div>
  );
}

export default Hands;