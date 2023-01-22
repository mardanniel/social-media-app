import React, { FormEvent, useContext, useState } from 'react';
import { BiPhotoAlbum, BiUserCircle } from 'react-icons/bi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import {
  MdAddReaction,
  MdOutlineDeleteForever,
  MdOutlineEditNote,
} from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import { PostContext } from '../../context/post-context';
import useOnCallFetch from '../../hooks/useOnCallFetch';
import { getTimeAndDate } from '../../shared/helper/time';
import { Post } from '../../shared/types';
import Dropdown from '../dialogs/dropdown';
import Modal from '../dialogs/modal';
import PostReaction from './post-reaction';

export default function PostItem({ post }: { post: Post }) {
  let { _id, creator, context, image, createdAt, updatedAt, reaction_details } =
    post;

  return (
    <li className='bg-zinc-900 rounded-lg mt-4 flex flex-col justify-center'>
      <div className='flex flex-col p-4'>
        <div className='flex gap-10 justify-between'>
          <div className='flex gap-2 items-center'>
            <HiOutlineUserCircle size={40} />
            <div className='flex flex-col'>
              <div>{`${creator?.firstName} ${creator?.lastName}`}</div>
              <div className='text-sm'>{`${getTimeAndDate(createdAt)} ${createdAt === updatedAt ? '' : '(edited)'}`}</div>
            </div>
          </div>
          <PostItemOption post={post} />
        </div>
        <div className='mt-4'>{context}</div>
      </div>
      <div className='bg-zinc-800 flex justify-center'>
        <img src={image} className='w-auto h-full' />
      </div>
      <PostReaction postID={_id} reactionDetails={reaction_details} />
    </li>
  );
}

function PostItemOption({ post }: { post: Post }) {
  const [postItemOptions, setPostItemOptions] = useState({
    visible: false,
    mode: '',
  });

  return (
    <React.Fragment>
      <Dropdown
        header={<SlOptions />}
        menuItems={[
          <button
            onClick={() => setPostItemOptions({ visible: true, mode: 'edit' })}
            className='flex items-center gap-2'
          >
            <MdOutlineEditNote />
            <span>Edit</span>
          </button>,
          <button
            onClick={() =>
              setPostItemOptions({ visible: true, mode: 'delete' })
            }
            className='flex items-center gap-2'
          >
            <MdOutlineDeleteForever />
            <span>Delete</span>
          </button>,
        ]}
        gap='top-5'
      />
      <Modal
        visible={postItemOptions.visible}
        handleClose={() =>
          setPostItemOptions({
            visible: false,
            mode: '',
          })
        }
      >
        {postItemOptions.visible && postItemOptions.mode === 'edit' && (
          <PostItemEditPrompt
            post={post}
            onEditClosePrompt={() =>
              setPostItemOptions({
                visible: false,
                mode: '',
              })
            }
          />
        )}
        {postItemOptions.visible && postItemOptions.mode === 'delete' && (
          <PostItemDeletePrompt
            postID={post._id}
            onDeleteClosePrompt={() =>
              setPostItemOptions({
                visible: false,
                mode: '',
              })
            }
          />
        )}
      </Modal>
    </React.Fragment>
  );
}

const PostItemEditPrompt = ({
  post,
  onEditClosePrompt,
}: {
  post: Post;
  onEditClosePrompt?: () => void;
}) => {
  const { updatePost } = useContext(PostContext);
  const { isLoading, result, call } = useOnCallFetch();
  const [postInput, setPostInput] = useState(post.context);
  const [postBtnVisibility, setPostBtnVisibility] = useState(false);

  const handleOnUpdatePost = (event: FormEvent) => {
    event.preventDefault();
    call(
      {
        url: '/api/post/upsert',
        method: 'POST',
        data: {
          _id: post._id,
          context: postInput,
        },
      },
      (successResult) => {
        updatePost(successResult.success as Post);
        setPostInput('');
        onEditClosePrompt?.();
      }
    );
  };

  const handlePostInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostBtnVisibility(event.target.value.length > 0);
    setPostInput(event.target.value);
  };

  return (
    <div className='bg-zinc-900 text-white px-2 py-4 rounded-lg flex justify-center'>
      <form className='grow flex flex-col gap-4' onSubmit={handleOnUpdatePost}>
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
};

const PostItemDeletePrompt = ({
  postID,
  onDeleteClosePrompt,
}: {
  postID: string;
  onDeleteClosePrompt?: () => void;
}) => {
  const { removePost } = useContext(PostContext);
  const { isLoading, call } = useOnCallFetch();

  const handleDeletePost = (event: React.MouseEvent) => {
    call(
      {
        url: '/api/post/delete',
        method: 'DELETE',
        data: {
          _id: postID,
        },
      },
      (successResult) => {
        if (successResult?.success) {
          removePost(successResult.success._id);
          onDeleteClosePrompt?.();
        }
      }
    );
  };

  return (
    <div className='bg-zinc-800 text-white flex flex-col items-center mx-auto p-10'>
      <h1>Are you sure you want to delete your post?</h1>
      <div className='mt-4 flex gap-2'>
        <button
          onClick={handleDeletePost}
          className='bg-blue-600 px-4 py-2 rounded-md font-bold'
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              aria-hidden='true'
              role='status'
              className='inline w-4 h-4 mr-3 text-white animate-spin'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='#E5E7EB'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentColor'
              />
            </svg>
          ) : null}
          Yes
        </button>
        <button
          onClick={() => onDeleteClosePrompt?.()}
          className='bg-gray-800 px-4 py-2 rounded-md font-bold'
          disabled={isLoading}
        >
          No
        </button>
      </div>
    </div>
  );
};
