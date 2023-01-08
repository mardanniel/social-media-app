import { useState, FormEvent } from 'react';
import { BiPhotoAlbum } from 'react-icons/bi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdAddReaction } from 'react-icons/md';

export default function PostCreate() {
  const [postBtnVisibility, setPostBtnVisibility] = useState(false);

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handlePostBtnVisibility = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostBtnVisibility(event.target.value.length > 0);
  };

  return (
    <div className='bg-zinc-900 px-2 py-4 rounded-lg flex justify-center'>
      <form className='grow flex flex-col gap-4' onSubmit={handlePostSubmit}>
        <div className='grow flex justify-around items-center gap-2'>
          <HiOutlineUserCircle size={30} />
          <input
            className='grow bg-zinc-800 text-white rounded-full p-2'
            type='text'
            placeholder="What's on your mind?"
            onChange={handlePostBtnVisibility}
          />
          <button
            hidden={!postBtnVisibility}
            className='bg-zinc-800 p-2 rounded-lg'
          >
            Post
          </button>
        </div>
        <hr />
        <div className='grow flex justify-around'>
          <div className='flex gap-2'>
            <BiPhotoAlbum size={25} />
            Photos
          </div>
          <div className='flex gap-2'>
            <MdAddReaction size={25} />
            Feeling
          </div>
        </div>
      </form>
    </div>
  );
}
