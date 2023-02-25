import React from 'react';
import Card from './Card';
import { Player } from '@/model';

interface Props {
  player: Player;
}

const PlayerHand: React.FC<Props> = ({ player }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-5 gap-1 w-32'>
        {JSON.parse(JSON.stringify(player.hand)).map((card: { suit: string; rank: string }) => {
          return <Card key={card.suit + card.rank} suit={card.suit} rank={card.rank} open={true} />;
        })}
      </div>
    </div>
  );
};

export default PlayerHand;
