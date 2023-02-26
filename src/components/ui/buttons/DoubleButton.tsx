import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const DoubleButton: React.FC<Props> = ({ onClick }) => {
  const unableDouble = useSelector((state: BlackjackState) => state.blackjack.unableDouble);

  return (
    <div className='m-5'>
      <button className={styles.double_btn} onClick={onClick} disabled={unableDouble}>
        <p className='text-white'>DOUBLE</p>
      </button>
    </div>
  );
};

export default DoubleButton;
