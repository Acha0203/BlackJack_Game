import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import { BlackjackState } from '@/types';

interface Props {
  imageUrl: string;
  amount: number;
  color: string;
  onClick: () => void;
}

const ChipButton: React.FC<Props> = ({ imageUrl, amount, color, onClick }) => {
  const bet = useSelector((state: BlackjackState) => state.blackjack.bet);
  const chips = useSelector((state: BlackjackState) => state.blackjack.chips);
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    if (chips - bet < amount) {
      setIsShort(true);
    }
    if (chips - bet >= amount) {
      setIsShort(false);
    }
  }, [amount, bet, chips]);

  return (
    <div className={styles.chip_image}>
      <button
        className={`${styles.chip_shiny} ${styles.shiny}`}
        onClick={onClick}
        disabled={isShort}
      >
        <Image
          src={imageUrl}
          alt={`Chip of ${amount}`}
          width={80}
          height={80}
          sizes='100vw'
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
        <p className={styles.chip} style={{ color: color }}>
          {amount}
        </p>
      </button>
    </div>
  );
};

export default ChipButton;
