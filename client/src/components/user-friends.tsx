import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi';

export default function UserFriends() {
  const friends = Array(10).fill('Mar Danniel Ginturo');
  return (
    <div className='bg-zinc-900 m-2 p-4 rounded-md'>
      <div className='flex gap-2 items-center'>
        <FaUserFriends size={30} />
        Friends
      </div>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className='flex gap-2 mt-2'>
            <HiOutlineUserCircle size={25} />
            {friend}
          </li>
        ))}
      </ul>
    </div>
  );
}