import styles from '../styles/Home.module.scss';

interface Props {
  suit: string;
  rank: string;
}

const Card: React.FC<Props> = ({ suit, rank }) => {
  return (
    <div className={styles.card}>
      <div className={styles.back}>
        <div className={styles.card_image}>
          <div className={styles.back_pattern}></div>
        </div>
      </div>
      <div className={styles.front}>
        <div className={styles.card_image}>
          <div
            className={styles.front_image}
            style={{ color: suit === '♥︎' || suit === '♦' ? 'red' : 'black' }}
          >
            <span>
              {rank}
              {suit}
            </span>
            <div>{suit}</div>
            <span>
              {rank}
              {suit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
