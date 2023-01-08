import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import UserLayout from './user-layout';

export default function UserRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );

  // return user?._id ? (
  //   <UserLayout>
  //     <Outlet />
  //   </UserLayout>
  // ) : (
  //   <Navigate to='/entry' state={{ from: location }} replace />
  // );
}
