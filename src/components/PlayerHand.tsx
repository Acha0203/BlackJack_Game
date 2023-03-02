import React from 'react';
import { useSelector } from 'react-redux';
import CardImage from './CardImage';
import { BlackjackState } from '@/types';

interface Props {
  userType: string;
}

const PlayerHand: React.FC<Props> = ({ userType }) => {
  const userHand = useSelector((state: BlackjackState) => state.blackjack.userHand);
  const ai1Hand = useSelector((state: BlackjackState) => state.blackjack.ai1Hand);
  const ai2Hand = useSelector((state: BlackjackState) => state.blackjack.ai2Hand);

  return (
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-5 gap-1 w-24 md:w-32'>
        {userType === 'user'
          ? userHand.map((card: { suit: string; rank: string }) => {
              return <CardImage key={card.suit + card.rank} suit={card.suit} rank={card.rank} />;
            })
          : userType === 'AI1'
          ? ai1Hand.map((card: { suit: string; rank: string }) => {
              return <CardImage key={card.suit + card.rank} suit={card.suit} rank={card.rank} />;
            })
          : ai2Hand.map((card: { suit: string; rank: string }) => {
              return <CardImage key={card.suit + card.rank} suit={card.suit} rank={card.rank} />;
            })}
      </div>
    </div>
  );
};

export default PlayerHand;
