import React from 'react';
import styles from '../../../styles/Home.module.scss';

interface Props {
  onClick: () => void;
}

const NewGameButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.start_btn} type='button' onClick={onClick}>
      New Game
    </button>
  );
};

export default NewGameButton;
