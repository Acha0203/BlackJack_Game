import Image from 'next/image';
import React from 'react';
import DealerHand from './DealerHand';
import GameStatus from './GameStatus';
import { Player } from '@/model';

interface Props {
  house: Player;
}

const DealerArea: React.FC<Props> = ({ house }) => {
  return (
    <div className='h-1/2 flex-col'>
      <div className='flex justify-center items-center'>
        <Image
          src={`images/${house.type}_icon.svg`}
          alt={`${house.type} icon`}
          width={40}
          height={40}
        />
        <p className='text-3xl text-white p-2'>Dealer</p>
      </div>
      <div className='text-center'>
        <p className='text-lg text-white p-2'>
          Score: {house.gameStatus !== 'waiting' ? house.getHandScore() : '?'}
        </p>
      </div>
      <GameStatus playerName={house.name} />
      <DealerHand house={house} />
    </div>
  );
};

export default DealerArea;
