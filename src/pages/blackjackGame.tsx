import Image from 'next/image';
import styles from '../styles/Game.module.scss';

const BlackjackGame = () => {
  return (
    <div className={styles.bj_table_wrapper}>
      <Image
        className={styles.bj_table}
        src='images/black-jack-table.svg'
        alt='BLACKJACK PAYS 3 TO 2. Dealer must stand on 17 and must draw to 16'
        fill
      />
    </div>
  );
};

export default BlackjackGame;
