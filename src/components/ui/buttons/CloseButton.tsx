import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { blackjackActions } from '@/store/blackjack';

const CloseButton = () => {
  const dispatch = useDispatch();

  const closeWindow = () => {
    dispatch(blackjackActions.setOpenResultLogWindow(false));
    setTimeout(() => {
      dispatch(blackjackActions.setShowResultLogWindow(false));
    }, 500);
  };

  return (
    <button className={styles.start_btn} type='button' onClick={closeWindow}>
      Close
    </button>
  );
};

export default CloseButton;
