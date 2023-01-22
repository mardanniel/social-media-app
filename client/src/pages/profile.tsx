import React, { useEffect, useState } from 'react';
import { BsFillFilePostFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineUserCircle } from 'react-icons/hi';
import { MdAddReaction } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import UserDetails from '../components/user/user-details';
import UserTimeline from '../components/user/user-timeline';
import useOnCallFetch from '../hooks/useOnCallFetch';
import { User } from '../shared/types';

export default function Profile() {
  const { userId } = useParams();
  const { isLoading, call } = useOnCallFetch();
  const [userProfile, setUserProfile] = useState<User>(null!);

  useEffect(() => {
    call(
      {
        url: `/api/user/${userId}`,
        method: 'GET',
      },
      (successResult) => {
        setUserProfile(successResult.success.user as User);
      }
    );
  }, []);

  if (!userProfile) return null;

  return (
    <div className='flex justify-center gap-8 p-2'>
      <div>
        <UserDetails user={userProfile} />
      </div>
      <div className='min-w-min'>
        <UserTimeline />
      </div>
    </div>
  );
}
