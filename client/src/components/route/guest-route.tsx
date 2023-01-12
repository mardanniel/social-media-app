import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';

export default function GuestRoute() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  if (isLoggedIn) return <Navigate to={from} replace />;

  return <Outlet />;
}
