import { useState } from 'react';

const InputText = () => {
  const [userName, setUserName] = useState('User');

  return (
    <input
      className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      id='name'
      type='text'
      placeholder='Input Your Name'
    />
  );
};

export default InputText;
