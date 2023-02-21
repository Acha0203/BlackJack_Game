import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';

const gameTypes = [
  { id: 1, type: 'Blackjack', unavailable: false },
  { id: 2, type: 'Poker', unavailable: true },
];

const SelectGameType = () => {
  const [selectedGameType, setSelectedGameType] = useState(gameTypes[0]);

  useEffect(() => {
    console.log(selectedGameType);
  }, [selectedGameType]);

  return (
    <Listbox value={selectedGameType} onChange={setSelectedGameType}>
      <Listbox.Button className='flex justify-between items-center relative appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
        {selectedGameType.type}
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <ChevronDownIcon width={20} />
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
        <Listbox.Options className='mt-1'>
          {gameTypes.map((gameType) => (
            <Listbox.Option key={gameType.id} value={gameType} disabled={gameType.unavailable}>
              {({ active, disabled, selected }) => (
                <div
                  className={`${
                    disabled
                      ? 'bg-gray-200 text-gray-400'
                      : active
                      ? 'bg-lime-600 text-white'
                      : 'bg-white text-black border'
                  } ${
                    gameType.id === 1 ? 'rounded-t' : 'rounded-b'
                  } p-2 w-full flex items-center shadow`}
                >
                  {selected && <CheckIcon width={20} />}
                  {gameType.type}
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
