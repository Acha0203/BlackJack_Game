import React from 'react';
import styles from '../../../styles/Home.module.scss';

interface Props {
  onClick: () => void;
}

const NextRoundButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.start_btn} type='button' onClick={onClick}>
      Next Round
    </button>
  );
};

export default NextRoundButton;
