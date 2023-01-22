import { useEffect, useState } from 'react';
import { BsFillFilePostFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useOnCallFetch from '../../hooks/useOnCallFetch';
import { User } from '../../shared/types';

export default function UserDetails({ user }: { user: User }) {
  const { isLoading, call } = useOnCallFetch();
  const [stats, setStats] = useState<{ friends?: number; post?: number }>();

  useEffect(() => {
    call({ method: 'GET', url: `/api/user/stats/${user._id}` }, (successResult) => {
      setStats(successResult.success);
    });
  }, []);

  return (
    <div className='bg-zinc-900 p-4 rounded-md'>
      <div className='flex flex-col gap-2 items-start justify-center'>
        <div className='flex flex-col gap-2 w-full items-center'>
          <HiOutlineUserCircle size={60} />
          <Link to='profile'>{`${user?.firstName} ${user?.lastName}`}</Link>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          {/* Friends Count */}
          <FaUserFriends size={30} />
          <div>{stats?.friends} Friends</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          {/* Posts Count */}
          <BsFillFilePostFill size={30} />
          <div>{stats?.post} Posts</div>
        </div>
      </div>
    </div>
  );
}
