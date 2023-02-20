import Image from 'next/image';
import styles from '../styles/Home.module.scss';

const Home = () => {
  return (
    <div className={styles.bj_table_wrapper}>
      <Image
        className={styles.bj_table}
        src='/black-jack-table.svg'
        alt='BLACKJACK PAYS 3 TO 2. Dealer must stand on 17 and must draw to 16'
        fill
      />
    </div>
  );
};

export default Home;
