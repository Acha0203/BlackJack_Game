import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const SurrenderButton: React.FC<Props> = ({ onClick }) => {
  const unableSurrender = useSelector((state: BlackjackState) => state.blackjack.unableSurrender);

  return (
    <div className='mt-3 mx-3 md:mt-5'>
      <button className={styles.surrender_btn} onClick={onClick} disabled={unableSurrender}>
        <p className='text-white'>SURRENDER</p>
      </button>
    </div>
  );
};

export default SurrenderButton;
