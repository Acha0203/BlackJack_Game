const WinSVG = () => {
  return (
    <div className='flex justify-center items-center'>
      <svg
        viewBox='0 0 360 30'
        width='400'
        height='70'
        xmlns='http://www.w3.org/2000/svg'
        display='inline-block'
      >
        <text
          x='50%'
          y='50%'
          fontSize='2rem'
          textAnchor='middle'
          dominantBaseline='middle'
          stroke='#1f5f32'
          strokeWidth='0.2rem'
          strokeLinejoin='round'
        >
          You Win !!
        </text>
        <text
          fill='url(#gradient100)'
          x='50%'
          y='50%'
          fontSize='2rem'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          You Win !!
        </text>
        <defs>
          <linearGradient id='gradient100' x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop offset='0%' stopColor='#5c925b' />
            <stop offset='100%' stopColor='#fff' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WinSVG;
