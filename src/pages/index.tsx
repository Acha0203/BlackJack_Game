import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import TitleSVG from '@/components/svgFiles/titleSVG';
import InputText from '@/components/ui/InputText';
import SelectGameType from '@/components/ui/SelectGameType';
import StartButton from '@/components/ui/buttons/StartButton';
import { Player } from '@/model';
import { useAppDispatch } from '@/store';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const Home = () => {
  const dispatch = useAppDispatch();
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);
  const gameType = useSelector((state: BlackjackState) => state.blackjack.gameType);
  const router = useRouter();
  const user = new Player(userName, 'user', gameType);

  const handleClick = () => {
    if (userName === '') {
      dispatch(blackjackActions.setUserName('John Doe'));
      user.name = 'John Doe';
    } else {
      user.name = userName;
    }
    user.gameType = gameType;

    // Cookieを使ってuserインスタンスを遷移先に渡す
    setCookie(null, 'user', JSON.stringify(user), {
      maxAge: 30 * 24 * 60 * 60, // 30日間有効
      path: '/', // すべてのページでCookieを利用可能にするため、ルートパスにセット
      sameSite: 'lax',
    });
    router.push('/betting');
  };

  return (
    <div className='flex justify-center items-center'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
        <div className={styles.cards}>
          <div className='pt-14'>
            <TitleSVG />
          </div>
        </div>
        <div className='mb-4 w-64'>
          <InputText />
        </div>
        <div className='inline-block relative w-64 mb-4'>
          <SelectGameType />
        </div>
        <div className='flex items-center justify-center w-64'>
          <StartButton onClick={handleClick} />
        </div>
      </form>
    </div>
  );
};

export default Home;
