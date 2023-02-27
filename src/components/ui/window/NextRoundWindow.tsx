import React from 'react';
import { useSelector } from 'react-redux';
import NextRoundButton from '../buttons/NextRoundButton';
import LoseSVG from '@/components/svgFiles/loseSVG';
import PushSVG from '@/components/svgFiles/pushSVG';
import WinSVG from '@/components/svgFiles/winSVG';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const NextRoundWindow: React.FC<Props> = ({ onClick }) => {
  const winAmount = useSelector((state: BlackjackState) => state.blackjack.winAmount);

  return (
    <div className='flex-col justify-center items-center text-center bg-white p-5 z-20'>
      {winAmount > 0 && <WinSVG />}
      {winAmount < 0 && <LoseSVG />}
      {winAmount === 0 && <PushSVG />}
      <p className='text-xl mb-4'>{winAmount}</p>
      <NextRoundButton onClick={onClick} />
    </div>
  );
};

export default NextRoundWindow;
