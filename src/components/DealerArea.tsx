import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
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
    <div className='flex-col h-48 sm:h-64 md:h-72 md:mt-5'>
      <div className='flex justify-center items-center'>
        <Image
          src={`images/${house.type}_icon.svg`}
          alt={`${house.type} icon`}
          width={40}
          height={40}
          sizes='100vw'
          className={styles.player_icon}
        />
        <p className='text-xl md:text-3xl text-white md:p-2'>Dealer</p>
      </div>
      <div className='text-center'>
        <p className='text-md md:text-lg text-white p-1 md:p-2'>
          Score: {houseGameStatus !== 'waiting' ? houseHandScore : '?'}
        </p>
      </div>
      <GameStatus playerName={house.name} />
      <DealerHand house={house} />
    </div>
  );
};

export default DealerArea;
