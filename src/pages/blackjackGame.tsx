import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import DealerArea from '@/components/DealerArea';
import PlayerArea from '@/components/PlayerArea';
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
  const [showBettingWindow, setShowBettingWindow] = useState(false);
  const table = useMemo(() => new Table(gameType), [gameType]);
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

  const promptUser = useCallback(() => {
    if (table.players[0].gameStatus === 'betting') {
      setShowBettingWindow(true);
    }
  }, [table.players]);

  const gameStart = useCallback(() => {
    table.players[0].name = userName;
    table.deck.shuffle();
    promptUser();
  }, [promptUser, table, userName]);

  const handleClick = () => {
    table.players[0].bet = bet;
    table.turnCounter++;
    table.players[0].gameStatus = 'waiting';
    setShowBettingWindow(false);

    while (table.gamePhase === 'betting') {
      table.haveTurn(0);
    }

    table.blackjackAssignPlayerHands();
    dispatch(blackjackActions.setUserHand(JSON.parse(JSON.stringify(table.players[0].hand))));
    dispatch(blackjackActions.setAi1Hand(JSON.parse(JSON.stringify(table.players[1].hand))));
    dispatch(blackjackActions.setAi2Hand(JSON.parse(JSON.stringify(table.players[2].hand))));
    dispatch(blackjackActions.setHouseHand(JSON.parse(JSON.stringify(table.house.hand))));
  };

  const hit = () => {
    table.players[0].gameStatus = 'hit';
    table.evaluateMove(table.players[0]);
    console.log(table.players[0]);
    dispatch(blackjackActions.setUserHand(JSON.parse(JSON.stringify(table.players[0].hand))));
    table.turnCounter++;

    table.haveTurn(0);
  };

  useEffect(() => {
    gameStart();
    console.log(table.players);
    console.log(table.players[0].hand);
  }, [gameStart, table.players]);

  return (
    <div>
      <div className={styles.bj_table_bg}>
        <DealerArea house={table.house} />
        <div className='flex justify-center items-start mb-4'>
          <PlayerArea player={table.players[1]} />
          <PlayerArea player={table.players[0]} />
          <PlayerArea player={table.players[2]} />
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
            <button className={styles.hit_btn} onClick={hit}>
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
      {showBettingWindow && (
        <div className={styles.overlay}>
          <BettingWindow onClick={() => handleClick()} />
        </div>
      )}
    </div>
  );
};

export default BlackjackGame;
