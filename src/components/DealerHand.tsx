import React from 'react';
import { useSelector } from 'react-redux';
import CardImage from './CardImage';
import SecretCard from './SecretCard';
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
      <div className='grid grid-cols-5 gap-1 w-24 md:w-32'>
        {houseHand.map((card: { suit: string; rank: string }) => {
          return <CardImage key={card.suit + card.rank} suit={card.suit} rank={card.rank} />;
        })}
        {houseGameStatus === 'waiting' && house.hand.length > 0 && <SecretCard />}
      </div>
    </div>
  );
};

export default DealerHand;
