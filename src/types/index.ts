export type BlackjackState = {
  blackjack: {
    userName: string;
    gameType: string;
    chips: number;
    bet: number;
    userHand: CardObj[];
    ai1Hand: CardObj[];
    ai2Hand: CardObj[];
    houseHand: CardObj[];
    userGameStatus: string;
    ai1GameStatus: string;
    ai2GameStatus: string;
    houseGameStatus: string;
    userHandScore: number;
    ai1HandScore: number;
    ai2HandScore: number;
    houseHandScore: number;
  };
};

export type CardObj = {
  suit: string;
  rank: string;
};
