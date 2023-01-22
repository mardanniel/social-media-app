import { useContext } from 'react';
import UserDetails from '../components/user/user-details';
import UserTimeline from '../components/user/user-timeline';
import { AuthContext } from '../context/auth-context';

export default function SearchedProfile() {
  const { user } = useContext(AuthContext);

  return (
    <div className='flex justify-center gap-8 p-2'>
      <div>
        <UserDetails user={user} />
      </div>
      <div className='min-w-min'>
        <UserTimeline />
      </div>
    </div>
  );
}
