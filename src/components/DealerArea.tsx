import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import DealerHand from './DealerHand';
import GameStatus from './GameStatus';
import { Player } from '@/model';
import { BlackjackState } from '@/types';

interface Props {
  house: Player;
}

const DealerArea: React.FC<Props> = ({ house }) => {
  const houseGameStatus = useSelector((state: BlackjackState) => state.blackjack.houseGameStatus);
  const houseHandScore = useSelector((state: BlackjackState) => state.blackjack.houseHandScore);

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
          Score: {houseGameStatus !== 'waiting' ? houseHandScore : '?'}
        </p>
      </div>
      <GameStatus playerName={house.name} />
      <DealerHand house={house} />
    </div>
  );
};

export default DealerArea;
