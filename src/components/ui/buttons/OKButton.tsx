import React from 'react';

const OKButton = () => {
  const handleClick = () => {};

  return (
    <button
      className='bg-green-700 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full'
      type='button'
      onClick={handleClick}
    >
      OK
    </button>
  );
};

export default OKButton;
