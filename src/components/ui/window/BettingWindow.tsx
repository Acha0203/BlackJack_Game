import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import AllInButton from '../buttons/AllInButton';
import ResetButton from '../buttons/ResetButton';
import BettingSVG from '@/components/svgFiles/bettingSVG';
import ChipButton from '@/components/ui/buttons/ChipButton';
import OKButton from '@/components/ui/buttons/OKButton';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
  betDenominations: number[];
}

const BettingWindow: React.FC<Props> = ({ onClick, betDenominations }) => {
  const dispatch = useDispatch();
  const bet = useSelector((state: BlackjackState) => state.blackjack.bet);
  const chips = useSelector((state: BlackjackState) => state.blackjack.chips);
  const [openWindow, setOpenWindow] = useState(false);

  const betChips = (amount: number) => {
    dispatch(blackjackActions.addBet(amount));
  };

  useEffect(() => {
    if (!openWindow) {
      setTimeout(() => {
        setOpenWindow(true);
      }, 500);
    }
  }, [openWindow]);

  return (
    <div className={styles.modal}>
      {openWindow ? (
        <div>
          <div className={`${styles.back} ${styles.hide_back}`}>
            <div className='bg-gray-500 absolute w-full h-full'></div>
          </div>
          <div className={`${styles.front} ${styles.open_front}`}>
            <div className='flex-row justify-center items-center bg-white p-5 z-10'>
              <BettingSVG />
              <div className='flex justify-between items-center p-4'>
                <ChipButton
                  imageUrl='images/chip-icon-1.svg'
                  amount={betDenominations[0]}
                  color='#ff8400'
                  onClick={() => betChips(betDenominations[0])}
                />
                <ChipButton
                  imageUrl='images/chip-icon-2.svg'
                  amount={betDenominations[1]}
                  color='#009a39'
                  onClick={() => betChips(betDenominations[1])}
                />
                <ChipButton
                  imageUrl='images/chip-icon-3.svg'
                  amount={betDenominations[2]}
                  color='#00198a'
                  onClick={() => betChips(betDenominations[2])}
                />
                <ChipButton
                  imageUrl='images/chip-icon-4.svg'
                  amount={betDenominations[3]}
                  color='#45008f'
                  onClick={() => betChips(betDenominations[3])}
                />
              </div>
              <div className='text-center'>
                <p className='text-3xl'>You Bet ${bet}</p>
              </div>
              <div className='text-center'>
                <p className='text-xl'>Your Chips : ${chips}</p>
              </div>
              <div className='flex justify-center items-center pt-4'>
                <OKButton onClick={onClick} />
              </div>
              <div className='flex justify-center items-center pt-2'>
                <ResetButton />
                <AllInButton />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.back}>
            <div className='bg-gray-500 absolute w-full h-full'></div>
          </div>
          <div className={styles.front}>
            <div className='flex-row justify-center items-center bg-white p-5 z-10'>
              <BettingSVG />
              <div className='text-center'>
                <p className='text-3xl'>You Bet ${bet}</p>
              </div>
              <div className='text-center'>
                <p className='text-xl'>Your Chips : ${chips}</p>
              </div>
              <div className='flex justify-center items-center pt-4'>
                <OKButton onClick={onClick} />
              </div>
              <div className='flex justify-center items-center pt-2'>
                <ResetButton />
                <AllInButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BettingWindow;
