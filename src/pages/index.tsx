import styles from '../styles/Home.module.scss';
import TitleSVG from '@/components/svgFiles/titleSVG';

const Home = () => {
  return (
    <div className='flex justify-center items-center'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-6'>
        <div className={styles.cards}>
          <TitleSVG />
        </div>
        <div className='mb-4 w-64'>
          <input
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            placeholder='Input Your Name'
          />
        </div>
        <div className='inline-block relative w-64 mb-4'>
          <select className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
            <option>Choose Game Type</option>
            <option>Blackjack</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
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
