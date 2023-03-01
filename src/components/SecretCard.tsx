import styles from '../styles/Home.module.scss';

const SecretCard = () => {
  return (
    <div className={styles.secret_card}>
      <div className={styles.card}>
        <div className={styles.back}>
          <div className={styles.card_image}>
            <div className={styles.back_pattern}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecretCard;
