import React from 'react';
import styles from '../../../styles/Home.module.scss'

const OKButton = () => {
  const handleClick = () => {};

  return (
    <button
      className={styles.green_btn}
      type='button'
      onClick={handleClick}
    >
      OK
    </button>
  );
};

export default OKButton;
