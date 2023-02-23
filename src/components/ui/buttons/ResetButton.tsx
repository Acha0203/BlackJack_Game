import Image from 'next/image';
import React from 'react';
import styles from '../../../styles/Home.module.scss'

const ResetButton = () => {
  const handleClick = () => {};

  return (
    <button
      className={styles.blue_btn}
      type='button'
      onClick={handleClick}
    >
      <Image src='images/undo_icon.svg' alt='money icon' width={20} height={20} />
      <p className='ml-2'>Reset</p>
    </button>
  );
};

export default ResetButton;
