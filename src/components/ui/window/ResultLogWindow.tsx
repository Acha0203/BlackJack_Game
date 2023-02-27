import React from 'react';
import { useSelector } from 'react-redux';
import CloseButton from '../buttons/CloseButton';
import ResultLogSVG from '@/components/svgFiles/resultLogSVG';
import { BlackjackState } from '@/types';

const ResultLogWindow = () => {
  const roundResults = useSelector((state: BlackjackState) => state.blackjack.roundResults);

  return (
    <div className='flex-col justify-center items-center bg-white p-5 z-20'>
      <ResultLogSVG />
      <div className='h-32 overflow-auto'>
        {roundResults.map((result: string, index: number) => {
          return (
            <div className='text-center mb-5' key={index}>
              <p className='text-2xl mb-2'>Round {index + 1}</p>
              {result.split(/(\n)/).map((item: string, index: number) => {
                return (
                  <div className='text-center' key={index}>
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <CloseButton />
    </div>
  );
};

export default ResultLogWindow;
