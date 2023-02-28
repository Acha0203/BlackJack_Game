import { ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store';
import { blackjackActions } from '@/store/blackjack';
import { BlackjackState } from '@/types';

const InputText = () => {
  const dispatch = useAppDispatch();
  const userName = useSelector((state: BlackjackState) => state.blackjack.userName);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    dispatch(blackjackActions.setUserName(target.value));
  };

  return (
    <input
      className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      id='name'
      type='text'
      value={userName}
      onChange={handleNameChange}
      placeholder='Input Your Name'
    />
  );
};

export default InputText;
