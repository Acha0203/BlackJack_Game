import Image from 'next/image';
import React from 'react';
import styles from '../../../styles/Home.module.scss'

const AllInButton = () => {
  const handleClick = () => {};

  return (
    <button
      className={styles.red_btn}
      type='button'
      onClick={handleClick}
    >
      <Image src='images/money_icon.svg' alt='money icon' width={20} height={20} />
      <p className='ml-2'>All In</p>
    </button>
  );
};

export default AllInButton;
