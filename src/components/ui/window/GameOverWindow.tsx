import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import NewGameButton from '../buttons/NewGameButton';
import GameOverSVG from '@/components/svgFiles/gameOverSVG';
import { blackjackActions } from '@/store/blackjack';

const NextGameWindow = () => {
  const dispatch = useDispatch();
  const [openWindow, setOpenWindow] = useState(false);

  const startNewGame = () => {
    setOpenWindow(false);
    dispatch(blackjackActions.setUserGameStatus('betting'));
    dispatch(blackjackActions.setShowGameOverWindow(false));
    dispatch(blackjackActions.setUnableSurrender(false));
    dispatch(blackjackActions.setUnableStand(false));
    dispatch(blackjackActions.setUnableHit(false));
    dispatch(blackjackActions.setUnableDouble(false));
  };

  useEffect(() => {
    if (!openWindow) {
      setTimeout(() => {
        setOpenWindow(true);
      }, 500);
    }
  }, [openWindow]);

  return (
    <div className={styles.modal} style={{ width: '400px', height: '200px' }}>
      {openWindow ? (
        <div>
          <div className={`${styles.back} ${styles.hide_back}`}>
            <div className='bg-black absolute w-full h-full'></div>
          </div>
          <div className={`${styles.front} ${styles.open_front}`}>
            <div className='flex-col justify-center items-center text-center bg-white w-full h-full p-5 z-20'>
              <GameOverSVG />
              <NewGameButton onClick={startNewGame} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.back}>
            <div className='bg-black absolute w-full h-full'></div>
          </div>
          <div className={styles.front}>
            <div className='flex-col justify-center items-center text-center bg-white w-full h-full p-5 z-20'>
              <GameOverSVG />
              <NewGameButton onClick={startNewGame} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NextGameWindow;
