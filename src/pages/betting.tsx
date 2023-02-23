import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import BettingSVG from '@/components/svgFiles/bettingSVG';
import ChipButton from '@/components/ui/ChipButton';

const BettingPage = () => {
  return (
    <div className='flex-row justify-center items-center bg-white p-5'>
      <div>
        <BettingSVG />
      </div>
      <div className='flex justify-between items-center'>
        <ChipButton
          imageUrl='images/chip-icon-1.svg'
          amount={5}
          color='#ff8400'
          onClick={() => console.log('You betted $5!')}
        />
        <ChipButton
          imageUrl='images/chip-icon-2.svg'
          amount={20}
          color='#009a39'
          onClick={() => console.log('You betted $20!')}
        />
        <ChipButton
          imageUrl='images/chip-icon-3.svg'
          amount={50}
          color='#00198a'
          onClick={() => console.log('You betted $50!')}
        />
        <ChipButton
          imageUrl='images/chip-icon-4.svg'
          amount={100}
          color='#45008f'
          onClick={() => console.log('You betted $100!')}
        />
      </div>
    </div>
  );
};

export default BettingPage;
