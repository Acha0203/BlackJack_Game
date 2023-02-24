import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import Card from '@/components/Card';
import BettingWindow from '@/components/ui/BettingWindow';
import { Player, Table } from '@/model';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const BlackjackGame = () => {
  // Cookieを使ってuserインスタンスを受け取る
  // const cookies = parseCookies();
  // const userObj = JSON.parse(cookies.user);
  // オブジェクトリテラルの形で渡されるため、クラスインスタンスに復元する
  // const user = new Player(userObj.name, userObj.type, userObj.gameType, userObj.chips);
  const dispatch = useDispatch();
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);
  const gameType = useSelector((state: BlackjackState) => state.blackjack.gameType);
  const bet = useSelector((state: BlackjackState) => state.blackjack.bet);
  const showWindow = useSelector((state: BlackjackState) => state.blackjack.showWindow);
  const table = new Table(gameType, userName);

  const handleClick = () => {
    table.players[0].bet = bet;
    table.players[0].gameStatus = 'waiting';
    console.log(table.players[0]);

    dispatch(blackjackActions.setShowWindow(false));
  };

  useEffect(() => {
    if (table.gamePhase === 'betting') {
      dispatch(blackjackActions.setShowWindow(true));
    }
  }, [dispatch, table.gamePhase]);

  return (
    <div>
      <div className={styles.bj_table_bg}>
        <div className='h-1/2 flex-col'>
          <div className='flex justify-center items-center'>
            <Image src='images/dealer_icon.svg' alt='dealer icon' width={40} height={40} />
            <p className='text-3xl text-white p-2'>Dealer</p>
          </div>
          <div className='text-center'>
            <p className='text-lg text-white p-2'>Score: XX</p>
          </div>
          <div className='flex justify-center items-center'>
            <div className='bg-gray-500 rounded-full text-center w-48 mb-4'>
              <p className='text-lg text-white p-1'>Waiting</p>
            </div>
          </div>
          <div className='flex justify-center items-center'>
            <div className='grid grid-cols-5 gap-1 w-40'>
              <Card suit='♥︎' rank='A' open={true} />
            </div>
            <div>
              <Card suit='♥︎' rank='K' open={false} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-6'>
          <div className='flex-col justify-center items-center'>
            <div className='flex justify-center items-center'>
              <Image src='images/robot_icon.svg' alt='robot icon' width={30} height={30} />
              <p className='text-3xl text-white p-2'>AI1</p>
            </div>
            <div className='text-center mb-2'>
              <p className='text-lg text-white'>Score: XX bet: 50</p>
              <p className='text-lg text-white'>Chips: 400</p>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-lime-500 rounded-full text-center w-48 mb-4'>
                <p className='text-lg text-white p-1'>Blackjack</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='grid grid-cols-5 gap-1 w-32'>
                <Card suit='♥︎' rank='A' open={true} />
                <Card suit='♦' rank='Q' open={true} />
                <Card suit='♠' rank='A' open={true} />
                <Card suit='♣' rank='J' open={true} />
                <Card suit='♥︎' rank='A' open={true} />
              </div>
            </div>
          </div>
          <div className='flex-col justify-center items-center'>
            <div className='flex justify-center items-center'>
              <Image src='images/user_icon.svg' alt='user icon' width={30} height={30} />
              <p className='text-3xl text-white p-2'>{userName}</p>
            </div>
            <div className='text-center mb-2'>
              <p className='text-lg text-white'>Score: XX bet: 50</p>
              <p className='text-lg text-white'>Chips: 400</p>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-lime-500 rounded-full text-center w-48 mb-4'>
                <p className='text-lg text-white p-1'>Blackjack</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='grid grid-cols-5 gap-1 w-32'>
                <Card suit='♥︎' rank='A' open={true} />
                <Card suit='♦' rank='Q' open={true} />
              </div>
            </div>
          </div>
          <div className='flex-col justify-center items-center'>
            <div className='flex justify-center items-center'>
              <Image src='images/robot_icon.svg' alt='robot icon' width={30} height={30} />
              <p className='text-3xl text-white p-2'>AI2</p>
            </div>
            <div className='text-center mb-2'>
              <p className='text-lg text-white'>Score: XX bet: 50</p>
              <p className='text-lg text-white'>Chips: 400</p>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-lime-500 rounded-full text-center w-48 mb-4'>
                <p className='text-lg text-white p-1'>Blackjack</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='grid grid-cols-5 gap-1 w-32'>
                <Card suit='♥︎' rank='A' open={true} />
                <Card suit='♦' rank='Q' open={true} />
                <Card suit='♠' rank='A' open={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showWindow && (
        <div className={styles.overlay}>
          <BettingWindow onClick={() => handleClick()} />
        </div>
      )}
    </div>
  );
};

export default BlackjackGame;
