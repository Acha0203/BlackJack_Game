import Image from 'next/image';
import styles from '../../styles/Home.module.scss';

interface Props {
  imageUrl: string;
  amount: number;
  color: string;
  onClick: () => void;
}

const ChipButton: React.FC<Props> = ({ imageUrl, amount, color, onClick }) => {
  return (
    <button className={`${styles.chip_shiny} ${styles.shiny}`} onClick={onClick}>
      <Image src={imageUrl} alt={`Chip of ${amount}`} width={80} height={80} />
      <p className={styles.chip} style={{ color: color }}>
        {amount}
      </p>
    </button>
  );
};

export default ChipButton;
