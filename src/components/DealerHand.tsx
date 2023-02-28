import React from 'react';
import { useSelector } from 'react-redux';
import CardImage from './CardImage';
import { Player } from '@/model';
import { BlackjackState } from '@/types';

interface Props {
  house: Player;
}

const DealerHand: React.FC<Props> = ({ house }) => {
  const houseHand = useSelector((state: BlackjackState) => state.blackjack.houseHand);
  const houseGameStatus = useSelector((state: BlackjackState) => state.blackjack.houseGameStatus);

  return (
    <div className='flex justify-center items-center'>
      {houseGameStatus === 'waiting' && house.hand.length > 0 ? (
        <div className='grid grid-cols-5 gap-1 w-24 md:w-32'>
          <div>
            <CardImage
              key={house.hand[0].suit + house.hand[0].rank}
              suit={house.hand[0].suit}
              rank={house.hand[0].rank}
              open={true}
            />
          </div>
          <div>
            <CardImage
              key={house.hand[1].suit + house.hand[1].rank}
              suit={house.hand[1].suit}
              rank={house.hand[1].rank}
              open={false}
            />
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-5 gap-1 w-40'>
          {houseHand.map((card: { suit: string; rank: string }) => {
            return (
              <CardImage
                key={card.suit + card.rank}
                suit={card.suit}
                rank={card.rank}
                open={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DealerHand;
