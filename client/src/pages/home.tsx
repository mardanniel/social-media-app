import PostCreate from '../components/post-create';
import PostList from '../components/post-list';
import UserDetails from '../components/user-details';
import UserFriends from '../components/user-friends';

export default function Home() {
  return (
    <div className='grid grid-cols-[30%_35%_30%] justify-center gap-2 p-2'>
      <div className='relative'>
        <div className='fixed top-14 left-0'>
          <UserDetails />
        </div>
      </div>
      <div className='flex flex-col'>
        <PostCreate />
        <PostList postOwnership='random'/>
      </div>
      <div className='relative'>
        <div className='fixed top-14 right-0'>
          <UserFriends />
        </div>
      </div>
    </div>
  );
}
