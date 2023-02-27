import React from 'react';
import { useSelector } from 'react-redux';
import NewGameButton from '../buttons/NewGameButton';
import GameOverSVG from '@/components/svgFiles/gameOverSVG';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const NextGameWindow: React.FC<Props> = ({ onClick }) => {
  return (
    <div className='flex-row justify-center items-center text-center bg-white p-5 z-20'>
      <GameOverSVG />
      <NewGameButton onClick={onClick} />
    </div>
  );
};

export default NextGameWindow;
