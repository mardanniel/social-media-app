import { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineUserCircle } from 'react-icons/hi';
import useOnClickFetch from '../../hooks/useOnClickFetch';

type Friend = {
  _id: string;
  friend: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

export default function UserFriends() {
  const [friends, setFriends] = useState<Friend[]>([]);

  const { isLoading, call } = useOnClickFetch();

  useEffect(() => {
    call(
      {
        url: 'api/friendship?page=1&perPage=10',
        method: 'GET',
      },
      (successResult) => {
        setFriends((prevFriends) => {
          let friendsResult = successResult.success as Friend[];
          let newFriends = friendsResult.filter(
            (friend, postIndex) =>
              prevFriends.findIndex(
                (prevFriend, prevPostIndex) => prevFriend._id === friend._id
              ) === -1
          );

          return [...prevFriends, ...newFriends];
        });
      }
    );
  }, []);

  return (
    <div className='bg-zinc-900 p-4 rounded-md'>
      <div className='flex gap-2 items-center'>
        <FaUserFriends size={30} />
        Friends
      </div>
      <ul>
        {friends.length > 0 ? (
          friends.map((friendDetails, index) => (
            <li key={index} className='flex gap-2 mt-2'>
              <HiOutlineUserCircle size={25} />
              {`${friendDetails.friend.firstName} ${friendDetails.friend.lastName}`}
            </li>
          ))
        ) : (
          <li>You don't have friends yet.</li>
        )}
      </ul>
    </div>
  );
}
