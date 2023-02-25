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

  const renderTable = useCallback(
    (table: Table) => {
      table.players[0].name = userName;
      table.deck.generateDeck();
      table.deck.shuffle();
    },
    [userName],
  );

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

    setShowBettingWindow(false);

    console.log(table.players);
    console.log(showBettingWindow);
  };

  useEffect(() => {
    renderTable(table);
  }, [renderTable, table]);

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
      {showBettingWindow && (
        <div className={styles.overlay}>
          <BettingWindow onClick={() => handleClick()} />
        </div>
      )}
    </div>
  );
};

export default BlackjackGame;
