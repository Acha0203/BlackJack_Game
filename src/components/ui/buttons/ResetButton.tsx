import React from 'react'

const ResetButton = () => {
  const handleClick = () => {};

  return (
    <button
      className='bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full'
      type='button'
      onClick={handleClick}
    >
      Reset
    </button>
  )
}

export default ResetButton