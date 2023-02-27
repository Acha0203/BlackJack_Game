import React from 'react';
import NewGameButton from '../buttons/NewGameButton';
import GameOverSVG from '@/components/svgFiles/gameOverSVG';

interface Props {
  onClick: () => void;
}

const NextGameWindow: React.FC<Props> = ({ onClick }) => {
  return (
    <div className='flex-col justify-center items-center text-center bg-white p-5 z-20'>
      <GameOverSVG />
      <NewGameButton onClick={onClick} />
    </div>
  );
};

export default NextGameWindow;
