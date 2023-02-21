import styles from '../styles/Home.module.scss';
import TitleSVG from '@/components/svgFiles/titleSVG';
import InputText from '@/components/ui/InputText';
import SelectGameType from '@/components/ui/SelectGameType';

const Home = () => {
  return (
    <div className='flex justify-center items-center'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
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
          <button
            className='bg-green-700 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-64'
            type='button'
          >
            Game Start
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
