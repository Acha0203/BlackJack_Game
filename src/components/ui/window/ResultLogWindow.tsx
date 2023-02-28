import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles/Home.module.scss';
import CloseButton from '../buttons/CloseButton';
import ResultLogSVG from '@/components/svgFiles/resultLogSVG';
import { BlackjackState } from '@/types';

const ResultLogWindow = () => {
  const openResultLogWindow = useSelector(
    (state: BlackjackState) => state.blackjack.openResultLogWindow,
  );
  const roundResults = useSelector((state: BlackjackState) => state.blackjack.roundResults);

  return (
    <div className={styles.modal} style={{ width: '460px', height: '300px' }}>
      {openResultLogWindow ? (
        <div>
          <div className={`${styles.back} ${styles.hide_back}`}>
            <div className='bg-black absolute w-full h-full'></div>
          </div>
          <div className={`${styles.front} ${styles.open_front}`}>
            <div className='flex-col justify-center items-center w-full h-full bg-white p-5 z-20'>
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
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.back}>
            <div className='bg-black absolute w-full h-full'></div>
          </div>
          <div className={styles.front}>
            <div className='flex-col justify-center items-center w-full h-full bg-white p-5 z-20'>
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
            </div>
            <CloseButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultLogWindow;
