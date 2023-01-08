import { createContext, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

interface AuthContextType {
  user: User;
  checkAuth: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider() {
  const [user, setUser] = useState<User>(null!);
  const checkAuth = () => {};

  const authProviderValue = {
    user,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={authProviderValue}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export function PrivateRoute() {
  const { user } = useAuth();
  const location = useLocation();

  return user?._id ? (
    <Outlet />
  ) : (
    <Navigate to='/entry' state={{ from: location }} replace />
  );
}
