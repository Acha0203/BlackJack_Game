import React from 'react';
import Card from './Card';
import { Player } from '@/model';

interface Props {
  house: Player;
}

const DealerHand: React.FC<Props> = ({ house }) => {
  return (
    <div className='flex justify-center items-center'>
      {house.gameStatus === 'waiting' && house.hand.length > 0 ? (
        <div className='grid grid-cols-5 gap-1 w-40'>
          <div>
            <Card
              key={house.hand[0].suit + house.hand[0].rank}
              suit={house.hand[0].suit}
              rank={house.hand[0].rank}
              open={true}
            />
          </div>
          <div>
            <Card
              key={house.hand[1].suit + house.hand[1].rank}
              suit={house.hand[1].suit}
              rank={house.hand[1].rank}
              open={false}
            />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-5 gap-1 w-40'>
          {JSON.parse(JSON.stringify(house.hand)).map((card: { suit: string; rank: string }) => {
            return (
              <Card key={card.suit + card.rank} suit={card.suit} rank={card.rank} open={true} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DealerHand;
