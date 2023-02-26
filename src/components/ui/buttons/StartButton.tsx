import styles from '../../../styles/Home.module.scss'

interface Props {
  onClick: () => void;
}

const StartButton: React.FC<Props> = ({ onClick }) => {

  return (
    <button
      className={styles.start_btn}
      type='button'
      onClick={onClick}
    >
      GAME START
    </button>
  );
};

export default StartButton;
