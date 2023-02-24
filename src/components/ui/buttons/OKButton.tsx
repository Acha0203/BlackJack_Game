import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const OKButton: React.FC<Props> = ({ onClick }) => {
  const bet = useSelector((state: BlackjackState) => state.blackjack.bet);
  const [isNotBetting, setIsNotBetting] = useState(true);

  useEffect(() => {
    setIsNotBetting(bet === 0 ? true : false);
  }, [bet]);

  return (
    <button className={styles.green_btn} type='button' onClick={onClick} disabled={isNotBetting}>
      OK
    </button>
  );
};

export default OKButton;
