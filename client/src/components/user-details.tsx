import { useContext } from 'react';
import { BsFillFilePostFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineUserCircle } from 'react-icons/hi';
import { MdAddReaction } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

export default function UserDetails() {
  const { user } = useContext(AuthContext);

  return (
    <div className='bg-zinc-900 p-4 rounded-md'>
      <div className='flex flex-col gap-2 items-start justify-center'>
        <div className='flex flex-col gap-2 w-full items-center'>
          <HiOutlineUserCircle size={40} />
          <Link to='profile'>{`${user.firstName} ${user.lastName}`}</Link>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          <HiOutlineMail size={30} />
          <div>{user.email}</div>
        </div>
        <hr className='w-full' />
        <div className='flex gap-2 justify-center items-center'>
          {/* Friends Count */}
          <FaUserFriends size={30} />
          <div>0 Friends</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          {/* Posts Count */}
          <BsFillFilePostFill size={30} />
          <div>0 Posts</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          {/* Reaction Count */}
          <MdAddReaction size={30} />
          <div>0 Reactions</div>
        </div>
      </div>
    </div>
  );
}
