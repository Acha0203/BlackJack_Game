import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '../styles/Home.module.scss';
import TitleSVG from '@/components/svgFiles/titleSVG';
import InputText from '@/components/ui/InputText';
import SelectGameType from '@/components/ui/SelectGameType';
import StartButton from '@/components/ui/buttons/StartButton';
import { useAppDispatch } from '@/store';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const Home = () => {
  const dispatch = useAppDispatch();
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);
  const router = useRouter();

  const handleClick = () => {
    if (userName === '') {
      dispatch(blackjackActions.setUserName('You'));
    }

    router.push('/blackjackGame');
  };

  return (
    <>
      <Head>
        <title>Let&apos;s Play Card Games!</title>
        <meta
          name='description'
          content='You can play the Blackjack card game on this page.'
          key='desc'
        />
      </Head>
      <div className={styles.curtain_open}>
        <div className='flex justify-center items-center'>
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
            <div className={styles.cards_icon}>
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
            <div className='flex items-center justify-center'>
              <StartButton onClick={handleClick} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
