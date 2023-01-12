import { useState, FormEvent, useContext } from 'react';
import { BiPhotoAlbum } from 'react-icons/bi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdAddReaction } from 'react-icons/md';
import { PostContext } from '../../context/post-context';
import useOnClickFetch from '../../hooks/useOnClickFetch';
import { Post } from '../../shared/types';

export default function PostCreate() {
  const { unshiftPost } = useContext(PostContext);
  const { result, isLoading, call } = useOnClickFetch();

  const [postInput, setPostInput] = useState('');
  const [postBtnVisibility, setPostBtnVisibility] = useState(false);

  const handlePostSubmit = (event: FormEvent) => {
    event.preventDefault();
    call(
      {
        url: '/api/post/upsert',
        method: 'POST',
        data: {
          context: postInput,
        },
      },
      (successResult) => {
        unshiftPost(successResult.success as Post);
        setPostInput('')
        setPostBtnVisibility(false);
      }
    );
  };

  const handlePostInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostBtnVisibility(event.target.value.length > 0);
    setPostInput(event.target.value);
  };

  return (
    <div className='bg-zinc-900 px-2 py-4 rounded-lg flex justify-center'>
      <form className='grow flex flex-col gap-4' onSubmit={handlePostSubmit}>
        <div className='grow flex justify-around items-center gap-2'>
          <HiOutlineUserCircle size={30} />
          <input
            className={`${
              result?.error ? 'border border-red-900' : ''
            }grow bg-zinc-800 text-white rounded-full p-2 outline-none`}
            type='text'
            placeholder="What's on your mind?"
            onChange={handlePostInput}
            disabled={isLoading}
            value={postInput}
            required
          />
          <button
            hidden={!postBtnVisibility}
            disabled={isLoading}
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
