import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

interface Props {
  onClick: () => void;
}

const StartButton: React.FC<Props> = ({ onClick }) => {
  const dispatch = useAppDispatch();
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);

  // const handleClick = () => {
  //   if (userName === '') {
  //     dispatch(blackjackActions.setUserName('John Doe'));
  //   }
  // };

  return (
    <button
      className='bg-green-700 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-64'
      type='button'
      onClick={onClick}
    >
      Game Start
    </button>
  );
};

export default StartButton;
