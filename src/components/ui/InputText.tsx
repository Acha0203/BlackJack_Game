import { useEffect, useState } from 'react';

const InputText = () => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    if (userName === '') {
      setUserName('User');
    }
    console.log(userName);
  }, [userName]);

  return (
    <input
      className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      id='name'
      type='text'
      onChange={(event) => setUserName(event.target.value)}
      placeholder='Input Your Name'
    />
  );
};

export default InputText;
