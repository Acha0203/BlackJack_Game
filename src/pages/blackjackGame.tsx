import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
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
      <div className='flex justify-start items-center'>
        <Image
          className={styles.bj_table}
          src='images/black-jack-table.svg'
          alt='BLACKJACK PAYS 3 TO 2. Dealer must stand on 17 and must draw to 16'
          fill
        />
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
