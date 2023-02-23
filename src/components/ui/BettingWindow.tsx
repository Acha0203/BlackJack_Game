import AllInButton from './buttons/AllInButton';
import ResetButton from './buttons/ResetButton';
import BettingSVG from '@/components/svgFiles/bettingSVG';
import ChipButton from '@/components/ui/buttons/ChipButton';
import OKButton from '@/components/ui/buttons/OKButton';

const BettingWindow = () => {
  return (
    <div className='flex-row justify-center items-center bg-white p-5 z-10'>
      <div>
        <BettingSVG />
      </div>
      <div className='flex justify-between items-center p-4'>
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
      <div className='text-center'>
        <p className='text-3xl'>You Bet $0</p>
      </div>
      <div className='text-center'>
        <p className='text-xl'>Your Chips : $400</p>
      </div>
      <div className='flex justify-center items-center pt-4'>
        <OKButton />
      </div>
      <div className='flex justify-center items-center pt-2'>
        <ResetButton />
        <AllInButton />
      </div>
    </div>
  );
};

export default BettingWindow;
