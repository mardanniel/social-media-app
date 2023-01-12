import { useContext } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import UserDetails from '../components/user/user-details';
import UserTimeline from '../components/user-timeline';
import { AuthContext } from '../context/auth-context';

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className='flex justify-center'>
      <div className='flex flex-col items-center w-2/3'>
        <div className='w-full bg-zinc-900 flex items-center justify-start gap-4 p-4 rounded-lg mt-2'>
          <HiOutlineUserCircle size={100} />
          <div className='text-4xl font-bold'>{`${user.firstName} ${user.lastName}`}</div>
        </div>
        <div className='w-full flex'>
          <div className='grow pt-2 pr-2'>
            <UserDetails />
          </div>
          <div className='grow flex flex-col mt-2'>
            <UserTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
