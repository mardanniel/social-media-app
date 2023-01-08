import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdAddReaction, MdComment } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';

export default function PostItem() {
  return (
    <li className='bg-zinc-900 rounded-lg mt-4 flex flex-col justify-center'>
      <div className='flex justify-between p-4'>
        <div className='flex gap-2 items-center'>
          <HiOutlineUserCircle size={40} />
          <div className='flex flex-col'>
            <div>Test User 123</div>
            <div className='text-sm'>September 69, 2022</div>
          </div>
        </div>
        <SlOptions />
      </div>
      <div className='bg-zinc-800'>
        <img src='sample-post.PNG' />
      </div>
      <div className='flex flex-col p-2'>
        <div className='flex justify-between px-2'>
          <div className='flex gap-1 items-center'>
            <MdAddReaction size={20} />
            0
          </div>
          <div className='flex gap-1 items-center'>
            <MdComment size={20} />
            0
          </div>
        </div>
        <hr className='my-2'/>
        <div className='flex justify-around px-2'>
          <div className='flex gap-1 items-center'>
            <MdAddReaction size={20} />
            React
          </div>
          <div className='flex gap-1 items-center'>
            <MdComment size={20} />
            Comment
          </div>
        </div>
      </div>
    </li>
  );
}
