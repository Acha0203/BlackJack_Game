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
  // テスト用
  let ai1Hand = [
    {
      suit: '♥︎',
      rank: 'A',
    },
    {
      suit: '♠',
      rank: 'K',
    },
  ];

  const handleClick = () => {
    table.players[0].bet = bet;
    table.players[0].gameStatus = 'waiting';
    // テスト用
    table.deck.generateDeck();
    table.deck.shuffle();
    for (let i = 0; i < table.players.length; i++) {
      for (let j = 0; j < 2; j++) {
        const card = table.deck.drawOne();
        console.log(card);
        if (card !== undefined) {
          table.players[i].hand.push(card);
        }
      }
    }

    for (let i = 0; i < 2; i++) {
      const card = table.deck.drawOne();
      if (card !== undefined) {
        table.house.hand.push(card);
      }
    }

    console.log(JSON.parse(JSON.stringify(table.players[1].hand)));
    ai1Hand = JSON.parse(JSON.stringify(table.players[1].hand));
    console.log(ai1Hand);
    // ここまでテスト用

    dispatch(blackjackActions.setShowWindow(false));
    table.gamePhase = 'acting';

    console.log(table.players);
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
            <div className='bg-gray-500 rounded-md text-center w-32 mb-4'>
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
        <div className='flex justify-center items-start mb-4'>
          <div className='flex-col justify-center items-start mx-10'>
            <div className='flex justify-center items-center'>
              <Image src='images/robot_icon.svg' alt='robot icon' width={30} height={30} />
              <p className='text-3xl text-white p-2'>{table.players[1].name.toUpperCase()}</p>
            </div>
            <div className='text-center mb-2'>
              <p className='text-lg text-white'>Score: XX bet: 50</p>
              <p className='text-lg text-white'>Chips: 400</p>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-lime-500 rounded-md text-center w-32 mb-4'>
                <p className='text-lg text-white p-1'>Blackjack</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='grid grid-cols-5 gap-1 w-32'>
                {ai1Hand.map((card: { suit: string; rank: string }) => {
                  return (
                    <Card
                      key={card.suit + card.rank}
                      suit={card.suit}
                      rank={card.rank}
                      open={true}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className='flex-col justify-center items-start mx-10'>
            <div className='flex justify-center items-center'>
              <Image src='images/user_icon.svg' alt='user icon' width={30} height={30} />
              <p className='text-3xl text-white p-2'>{userName}</p>
            </div>
            <div className='text-center mb-2'>
              <p className='text-lg text-white'>Score: XX bet: 50</p>
              <p className='text-lg text-white'>Chips: 400</p>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-lime-500 rounded-md text-center w-32 mb-4'>
                <p className='text-lg text-white p-1'>Blackjack</p>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='grid grid-cols-5 gap-1 w-32 relative left-4'>
                <Card suit='♥︎' rank='A' open={true} />
                <Card suit='♦' rank='Q' open={true} />
              </div>
            </div>
          </div>
          <div className='flex-col justify-center items-start mx-10'>
            <div className='flex justify-center items-center'>
              <Image src='images/robot_icon.svg' alt='robot icon' width={30} height={30} />
              <p className='text-3xl text-white p-2'>AI2</p>
            </div>
            <div className='text-center mb-2'>
              <p className='text-lg text-white'>Score: XX bet: 50</p>
              <p className='text-lg text-white'>Chips: 400</p>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-lime-500 rounded-md text-center w-32 mb-4'>
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
        <div className='flex justify-center items-center bg-black w-full'>
          <div className='m-5'>
            <button className={styles.surrender_btn}>
              <p className='text-white'>SURRENDER</p>
            </button>
          </div>
          <div className='m-5'>
            <button className={styles.stand_btn}>
              <p className='text-white'>STAND</p>
            </button>
          </div>
          <div className='m-5'>
            <button className={styles.hit_btn}>
              <p className='text-white'>HIT</p>
            </button>
          </div>
          <div className='m-5'>
            <button className={styles.duble_btn}>
              <p className='text-white'>DOUBLE</p>
            </button>
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
