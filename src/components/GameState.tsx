import React from 'react';
import { Player } from '@/model';

interface Props {
  player: Player;
}

const GameState: React.FC<Props> = ({ player }) => {
  return (
    <div className='flex justify-center items-center'>
      {player.gameStatus === 'betting' ? (
        <div className='bg-cyan-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Betting</p>
        </div>
      ) : player.gameStatus === 'double' ? (
        <div className='bg-amber-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Double</p>
        </div>
      ) : player.gameStatus === 'surrender' ? (
        <div className='bg-blue-700 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Surrender</p>
        </div>
      ) : player.gameStatus === 'stand' ? (
        <div className='bg-red-700 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Stand</p>
        </div>
      ) : player.gameStatus === 'hit' ? (
        <div className='bg-lime-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Hit</p>
        </div>
      ) : (
        <div className='bg-gray-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Waiting</p>
        </div>
      )}
    </div>
  );
};

export default GameState;
