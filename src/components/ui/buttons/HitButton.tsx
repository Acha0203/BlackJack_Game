import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const HitButton: React.FC<Props> = ({ onClick }) => {
  const unableHit = useSelector((state: BlackjackState) => state.blackjack.unableHit);

  return (
    <div className='m-5'>
      <button className={styles.hit_btn} onClick={onClick} disabled={unableHit}>
        <p className='text-white'>HIT</p>
      </button>
    </div>
  );
};

export default HitButton;