import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { blackjackActions } from '@/store/blackjack';

const ResultLogButton = () => {
  const dispatch = useDispatch();

  const showResultLog = () => {
    dispatch(blackjackActions.setShowResultLogWindow(true));
  };

  return (
    <div className='absolute top-5 left-5' onClick={showResultLog}>
      <Image src='images/score_icon.svg' alt='Result Log Button' width={50} height={50} />
    </div>
  );
};

export default ResultLogButton;
