import { parseCookies } from 'nookies';
import BettingSVG from '@/components/svgFiles/bettingSVG';
import ChipButton from '@/components/ui/buttons/ChipButton';
import OKButton from '@/components/ui/buttons/OKButton';
import { Player } from '@/model';

const BettingPage = () => {
  // Cookieを使ってuserインスタンスを受け取る
  const cookies = parseCookies();
  const userObj = JSON.parse(cookies.user);
  // オブジェクトリテラルの形で渡されるため、クラスインスタンスに復元する
  const user = new Player(userObj.name, userObj.type, userObj.gameType, userObj.chips);
  console.log(user);

  return (
    <div className='flex-row justify-center items-center bg-white p-5'>
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
      <div className='flex justify-center items-center p-4'>
        <OKButton />
      </div>
    </div>
  );
};

export default BettingPage;
