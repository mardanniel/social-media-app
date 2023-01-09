import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axiosInstance from '../shared/config/axios';

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

interface AuthContextType {
  user: User;
  isLoggedIn: boolean;
  checkAuth: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider() {
  const [user, setUser] = useState<User>(null!);
  const isLoggedIn = user !== null;

  const checkAuth = async () => {
    await axiosInstance({
      method: 'GET',
      url: '/api/auth/check-auth',
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setUser(null!);
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const authProviderValue = {
    user,
    isLoggedIn,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={authProviderValue}>
      <Outlet />
    </AuthContext.Provider>
  );
}
