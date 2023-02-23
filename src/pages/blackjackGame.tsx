import Image from 'next/image';
import { parseCookies } from 'nookies';
import styles from '../styles/Home.module.scss';
import BettingWindow from '@/components/ui/BettingWindow';
import { Player } from '@/model';

const BlackjackGame = () => {
  // Cookieを使ってuserインスタンスを受け取る
  const cookies = parseCookies();
  const userObj = JSON.parse(cookies.user);
  // オブジェクトリテラルの形で渡されるため、クラスインスタンスに復元する
  const user = new Player(userObj.name, userObj.type, userObj.gameType, userObj.chips);
  console.log(user);

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
      <div className={styles.overlay}>
        <BettingWindow />
      </div>
    </div>
  );
};

export default BlackjackGame;
