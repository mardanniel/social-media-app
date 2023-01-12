import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AppLoading from '../app-loading';
import Layout from '../wrapper/layout';

export default function UserRoute() {
  const { isLoggedIn, isCheckingAuthUser } = useAuth();
  const location = useLocation();

  if (isCheckingAuthUser) return <AppLoading />;

  if (!isLoggedIn)
    return <Navigate to='/entry' state={{ from: location }} replace />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
