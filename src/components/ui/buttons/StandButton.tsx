import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const StandButton: React.FC<Props> = ({ onClick }) => {
  const unableStand = useSelector((state: BlackjackState) => state.blackjack.unableStand);

  return (
    <div className='mt-3 mx-3 md:mt-5'>
      <button className={styles.stand_btn} onClick={onClick} disabled={unableStand}>
        <p className='text-white'>STAND</p>
      </button>
    </div>
  );
};

export default StandButton;