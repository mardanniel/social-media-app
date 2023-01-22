import { useContext } from 'react';
import UserDetails from '../components/user/user-details';
import UserFriends from '../components/user/user-friends';
import UserTimeline from '../components/user/user-timeline';
import { AuthContext } from '../context/auth-context';

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className='grid grid-cols-[30%_35%_30%] justify-center gap-2 p-2'>
      <div className='relative'>
        <div className='fixed top-14 left-0 p-2'>
          <UserDetails user={user} />
        </div>
      </div>
      <div className='flex flex-col'>
        <UserTimeline />
      </div>
      <div className='relative'>
        <div className='fixed top-14 right-0 p-2'>
          <UserFriends />
        </div>
      </div>
    </div>
  );
}
