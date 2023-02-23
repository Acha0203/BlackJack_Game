import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import BettingSVG from '@/components/svgFiles/bettingSVG';

const BettingPage = () => {
  return (
    <div className='flex-row justify-center items-center bg-white p-5'>
      <div>
        <BettingSVG />
      </div>
      <div className='flex justify-between items-center'>
        <button className={`${styles.chip_shiny} ${styles.shiny}`}>
          <Image src='images/chip-icon-1.svg' alt='Chip of 5' width={80} height={80} />
          <p className={styles.chip5}>5</p>
        </button>
        <button className={`${styles.chip_shiny} ${styles.shiny}`}>
          <Image src='images/chip-icon-2.svg' alt='Chip of 20' width={80} height={80} />
          <p className={styles.chip20}>20</p>
        </button>
        <button className={`${styles.chip_shiny} ${styles.shiny}`}>
          <Image src='images/chip-icon-3.svg' alt='Chip of 50' width={80} height={80} />
          <p className={styles.chip50}>50</p>
        </button>
        <button className={`${styles.chip_shiny} ${styles.shiny}`}>
          <Image src='images/chip-icon-4.svg' alt='Chip of 100' width={80} height={80} />
          <p className={styles.chip100}>100</p>
        </button>
      </div>
    </div>
  );
};

export default BettingPage;
