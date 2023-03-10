import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { blackjackActions } from '@/store/blackjack';

const ResultLogButton = () => {
  const dispatch = useDispatch();

  const showResultLog = () => {
    dispatch(blackjackActions.setShowResultLogWindow(true));
    setTimeout(() => {
      dispatch(blackjackActions.setOpenResultLogWindow(true));
    }, 500);
  };

  return (
    <div className={styles.result_log} onClick={showResultLog}>
      <Image
        src='images/score_icon.svg'
        alt='Result Log Button'
        width={50}
        height={50}
        sizes='100vw'
        className={styles.result_log_icon}
      />
    </div>
  );
};

export default ResultLogButton;
