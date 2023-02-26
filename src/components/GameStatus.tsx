import React from 'react';
import { useSelector } from 'react-redux';
import { BlackjackState } from '@/types';

interface Props {
  playerName: string;
}

const GameStatus: React.FC<Props> = ({ playerName }) => {
  const userGameStatus = useSelector((state: BlackjackState) => state.blackjack.userGameStatus);
  const ai1GameStatus = useSelector((state: BlackjackState) => state.blackjack.ai1GameStatus);
  const ai2GameStatus = useSelector((state: BlackjackState) => state.blackjack.ai2GameStatus);
  const houseGameStatus = useSelector((state: BlackjackState) => state.blackjack.houseGameStatus);

  let gameStatus = '';
  if (playerName === 'house') {
    gameStatus = houseGameStatus;
  } else if (playerName === 'ai1') {
    gameStatus = ai1GameStatus;
  } else if (playerName === 'ai2') {
    gameStatus = ai2GameStatus;
  } else {
    gameStatus = userGameStatus;
  }

  return (
    <div className='flex justify-center items-center'>
      {gameStatus === 'betting' ? (
        <div className='bg-cyan-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Betting</p>
        </div>
      ) : gameStatus === 'double' ? (
        <div className='bg-amber-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Double</p>
        </div>
      ) : gameStatus === 'surrender' ? (
        <div className='bg-blue-700 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Surrender</p>
        </div>
      ) : gameStatus === 'stand' ? (
        <div className='bg-red-700 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Stand</p>
        </div>
      ) : gameStatus === 'hit' ? (
        <div className='bg-lime-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Hit</p>
        </div>
      ) : gameStatus === 'bust' ? (
        <div className='bg-pink-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Bust</p>
        </div>
      ) : gameStatus === 'broken' ? (
        <div className='bg-gray-800 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Broken</p>
        </div>
      ) : (
        <div className='bg-gray-500 rounded-md text-center w-32 mb-4'>
          <p className='text-lg text-white p-1'>Waiting</p>
        </div>
      )}
    </div>
  );
};

export default GameStatus;
