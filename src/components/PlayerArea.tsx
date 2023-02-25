import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import GameState from './GameState';
import PlayerHand from './PlayerHand';
import { Player } from '@/model';
import { BlackjackState } from '@/types';

interface Props {
  player: Player;
}

const PlayerArea: React.FC<Props> = ({ player }) => {
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);
  return (
    <div className='flex-col justify-center items-start mx-10'>
      <div className='flex justify-center items-center'>
        <Image
          src={`images/${player.type}_icon.svg`}
          alt={`${player.type} icon`}
          width={30}
          height={30}
        />
        <p className='text-3xl text-white p-2'>{player.name}</p>
      </div>
      <div className='text-center mb-2'>
        <p className='text-lg text-white'>
          Score: {player.getHandScore()} bet: {player.bet}
        </p>
        <p className='text-lg text-white'>Chips: {player.chips}</p>
      </div>
      <GameState player={player} />
      <PlayerHand player={player} />
    </div>
  );
};

export default PlayerArea;
