import Image from 'next/image';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const AllInButton = () => {
  const dispatch = useDispatch();
  const bet = useSelector((state: BlackjackState) => state.blackjack.bet);
  const chips = useSelector((state: BlackjackState) => state.blackjack.chips);
  const isAllIn = useSelector((state: BlackjackState) => state.blackjack.isAllIn);

  const handleClick = () => {
    dispatch(blackjackActions.setBet(chips));
    dispatch(blackjackActions.setIsAllIn(true));
  };

  useEffect(() => {
    if (chips > bet) {
      dispatch(blackjackActions.setIsAllIn(false));
    }
  }, [bet, chips, dispatch]);

  return (
    <button className={styles.all_in_btn} type='button' onClick={handleClick} disabled={isAllIn}>
      <Image src='images/money_icon.svg' alt='money icon' width={20} height={20} />
      <p className='ml-2'>ALL IN</p>
    </button>
  );
};

export default AllInButton;
