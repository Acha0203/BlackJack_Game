import Image from 'next/image';
import React from 'react';
import GameState from './GameState';
import PlayerHand from './PlayerHand';
import { Player } from '@/model';

interface Props {
  player: Player;
}

const PlayerArea: React.FC<Props> = ({ player }) => {
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
      {player.type === 'user' && <PlayerHand userType={player.type} />}
      {player.type === 'ai' && <PlayerHand userType={player.name} />}
    </div>
  );
};

export default PlayerArea;
