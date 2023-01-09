import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import UserLayout from './user-layout';

export default function UserRoute() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn)
    return <Navigate to='/entry' state={{ from: location }} replace />;

  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}
