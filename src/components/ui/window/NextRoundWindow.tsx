import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import NextRoundButton from '../buttons/NextRoundButton';
import LoseSVG from '@/components/svgFiles/loseSVG';
import PushSVG from '@/components/svgFiles/pushSVG';
import WinSVG from '@/components/svgFiles/winSVG';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const NextRoundWindow: React.FC<Props> = ({ onClick }) => {
  const winAmount = useSelector((state: BlackjackState) => state.blackjack.winAmount);
  const [openWindow, setOpenWindow] = useState(false);

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
              {winAmount > 0 && <WinSVG />}
              {winAmount < 0 && <LoseSVG />}
              {winAmount === 0 && <PushSVG />}
              <p className='text-xl mb-4'>{winAmount}</p>
              <NextRoundButton onClick={onClick} />
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
              {winAmount > 0 && <WinSVG />}
              {winAmount < 0 && <LoseSVG />}
              {winAmount === 0 && <PushSVG />}
              <p className='text-xl mb-4'>{winAmount}</p>
              <NextRoundButton onClick={onClick} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NextRoundWindow;
