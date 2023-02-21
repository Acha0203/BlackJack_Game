const StartButton = () => {
  const handleClick = () => {
    
  };

  return (
    <button
      className='bg-green-700 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-64'
      type='button'
      onClick={handleClick}
    >
      Game Start
    </button>
  );
};

export default StartButton;
