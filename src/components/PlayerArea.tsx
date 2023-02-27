import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import GameStatus from './GameStatus';
import PlayerHand from './PlayerHand';
import { Player } from '@/model';
import { BlackjackState } from '@/types';

interface Props {
  player: Player;
}

const PlayerArea: React.FC<Props> = ({ player }) => {
  const userHandScore = useSelector((state: BlackjackState) => state.blackjack.userHandScore);
  const ai1HandScore = useSelector((state: BlackjackState) => state.blackjack.ai1HandScore);
  const ai2HandScore = useSelector((state: BlackjackState) => state.blackjack.ai2HandScore);

  return (
    <div className='flex-col justify-center items-start mx-10 h-72'>
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
          Score:{' '}
          {player.name === 'ai1'
            ? ai1HandScore
            : player.name === 'ai2'
            ? ai2HandScore
            : userHandScore}{' '}
          bet: {player.bet}
        </p>
        <p className='text-lg text-white'>Chips: {player.chips}</p>
      </div>
      <GameStatus playerName={player.name} />
      {player.type === 'user' && <PlayerHand userType={player.type} />}
      {player.type === 'ai' && <PlayerHand userType={player.name} />}
    </div>
  );
};

export default PlayerArea;
