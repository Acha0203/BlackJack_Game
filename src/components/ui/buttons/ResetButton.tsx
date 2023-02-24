import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { blackjackActions } from '@/store/blackjack';

const ResetButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(blackjackActions.resetBet());
  };

  return (
    <button className={styles.blue_btn} type='button' onClick={handleClick}>
      <Image src='images/undo_icon.svg' alt='money icon' width={20} height={20} />
      <p className='ml-2'>Reset</p>
    </button>
  );
};

export default ResetButton;
