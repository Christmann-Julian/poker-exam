import React from "react";
import Hand from "./Hand";
import { CardType } from '../type/types';

export interface HandsProps {
    playerHand: CardType[];
    dealerHand: CardType[];
    playerValue: string;
    dealerValue: string;
}

const Hands: React.FC<HandsProps> = ({ playerHand, dealerHand, playerValue, dealerValue}) => {
  return (
    <div className="flex justify-around">
      <Hand
        cards={playerHand}
        title="Player's Hand"
        handValue={playerValue}
      />
      <Hand
        cards={dealerHand}
        title="Dealer's Hand"
        handValue={dealerValue}
      />
    </div>
  );
}

export default Hands;