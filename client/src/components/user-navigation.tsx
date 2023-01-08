import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoNotifications } from 'react-icons/io5';

export default function UserNavigation() {
  return (
    <div className='fixed top-0 left-0 right-0 bg-zinc-900'>
      <div className='grid grid-cols-3 gap-2 py-2 px-6 items-center h-14'>
        <div className='justify-self-start'>
          <h1 className='font-bold text-3xl'>Socialx</h1>
        </div>
        <div className='justify-self-center'>
          <input
            className='bg-zinc-800 text-white py-2 px-4 rounded-full w-96'
            type='text'
            placeholder='Search'
          />
        </div>
        <div className='justify-self-end'>
          <ul className='flex gap-2'>
            <li className='bg-zinc-800 rounded-full p-2'>
              <IoNotifications size={25} />
            </li>
            <li className='bg-zinc-800 rounded-full p-2'>
              <HiOutlineUserCircle size={25} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
