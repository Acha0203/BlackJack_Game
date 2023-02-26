import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';

interface Props {
  suit: string;
  rank: string;
  open: boolean;
}

const Card: React.FC<Props> = ({ suit, rank, open }) => {
  const [openCards, setOpenCards] = useState(false);

  useEffect(() => {
    if (open) {
      if (!openCards) {
        setTimeout(() => {
          setOpenCards(true);
        }, 1000);
      }
    }
  }, [open, openCards]);

  return (
    <div className={styles.card}>
      {openCards ? (
        <div>
          <div className={`${styles.back} ${styles.hide_back}`}>
            <div className={styles.card_image}>
              <div className={styles.back_pattern}></div>
            </div>
          </div>
          <div className={`${styles.front} ${styles.open_front}`}>
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
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default Card;
