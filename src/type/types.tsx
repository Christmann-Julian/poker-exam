export interface CardType {
  rank: string;
  suit: string;
}
  
export interface ScoreType {
  player: number;
  dealer: number;
}

export interface ResultType {
  type: string;
  message: string;
}