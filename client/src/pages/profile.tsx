import { HiOutlineUserCircle } from 'react-icons/hi';
import PostCreate from '../components/post-create';
import PostList from '../components/post-list';
import UserDetails from '../components/user-details';

export default function Profile() {
  return (
    <div className='flex flex-col items-center h-auto p-4'>
      <div className='bg-zinc-900 w-full rounded-lg flex flex-col items-center justify-center'>
        <div className='bg-zinc-800 w-full flex flex-col items-center border-b border-zinc-600 rounded-t-lg'>
          <HiOutlineUserCircle size={150} className='mt-14 -mb-10' />
        </div>
        <div className='m-8 text-3xl font-bold'>Hello World</div>
      </div>
      <div className='flex'>
        <UserDetails />
        <div className='flex flex-col mt-2'>
          <PostCreate />
          <PostList postOwnership='user'/>
        </div>
      </div>
    </div>
  );
}
