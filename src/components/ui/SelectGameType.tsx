import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const gameType = [
  { id: 1, type: 'Blackjack', unavailable: false },
  { id: 2, type: 'Poker', unavailable: true },
];

const SelectGameType = () => {
  const [selectedGameType, setSelectedGameType] = useState(gameType[0]);

  return (
    <Listbox value={selectedGameType} onChange={setSelectedGameType}>
      <Listbox.Button className='flex justify-between items-center relative appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
        {selectedGameType.type}
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg
            className='fill-current h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </Listbox.Button>
      <Transition
        enter='transition duration-300 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-300 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Listbox.Options>
          {gameType.map((game) => (
            <Listbox.Option key={game.id} value={game} disabled={game.unavailable}>
              {({ active, disabled, selected }) => (
                <div
                  className={`${
                    disabled
                      ? 'bg-gray-200 text-gray-400'
                      : active
                      ? 'bg-lime-600 text-white'
                      : 'bg-white text-black'
                  } p-2 w-full flex items-center rounded border border-gray-400 shadow`}
                >
                  {selected && <CheckIcon width={20} />}
                  {game.type}
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default SelectGameType;
