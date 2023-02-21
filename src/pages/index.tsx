import { FormEventHandler } from 'react';
import styles from '../styles/Home.module.scss';
import TitleSVG from '@/components/svgFiles/titleSVG';
import InputText from '@/components/ui/InputText';
import SelectGameType from '@/components/ui/SelectGameType';
import StartButton from '@/components/ui/StartButton';

const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
};

const Home = () => {
  return (
    <div className='flex justify-center items-center'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-6' onSubmit={handleSubmit}>
        <div className={styles.cards}>
          <TitleSVG />
        </div>
        <div className='mb-4 w-64'>
          <InputText />
        </div>
        <div className='inline-block relative w-64 mb-4'>
          <SelectGameType />
        </div>
        <div className='flex items-center justify-center w-64'>
          <StartButton />
        </div>
      </form>
    </div>
  );
};

export default Home;
