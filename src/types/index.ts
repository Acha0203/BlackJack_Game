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
  };
};

export type CardObj = {
  suit: string;
  rank: string;
};
