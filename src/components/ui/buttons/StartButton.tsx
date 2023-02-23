import styles from '../../../styles/Home.module.scss'

interface Props {
  onClick: () => void;
}

const StartButton: React.FC<Props> = ({ onClick }) => {

  return (
    <button
      className={styles.green_btn}
      type='button'
      onClick={onClick}
    >
      Game Start
    </button>
  );
};

export default StartButton;
