import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const AllInButton = () => {
  const dispatch = useDispatch();
  const chips = useSelector((state: BlackjackState) => state.blackjack.chips);
  const [isAllIn, setIsAllIn] = useState(false);

  const handleClick = () => {
    dispatch(blackjackActions.setBet(chips));
    setIsAllIn(true);
  };

  return (
    <button className={styles.all_in_btn} type='button' onClick={handleClick} disabled={isAllIn}>
      <Image src='images/money_icon.svg' alt='money icon' width={20} height={20} />
      <p className='ml-2'>ALL IN</p>
    </button>
  );
};

export default AllInButton;
