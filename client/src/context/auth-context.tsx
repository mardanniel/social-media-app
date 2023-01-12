import { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { axiosInstance } from '../shared/config/axios';

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
  isCheckingAuthUser: boolean;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider() {
  const [user, setUser] = useState<User>(null!);
  const [isCheckingAuthUser, setIsCheckingAuthUser] = useState(false);
  const isLoggedIn = user !== null;

  const checkAuth = async () => {
    setIsCheckingAuthUser(true);

    await axiosInstance({
      method: 'GET',
      url: '/api/auth/check-auth',
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setUser(null!);
      })
      .finally(() => {
        setIsCheckingAuthUser(false);
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const authProviderValue = {
    user,
    isLoggedIn,
    checkAuth,
    isCheckingAuthUser
  };

  return (
    <AuthContext.Provider value={authProviderValue}>
      <Outlet />
    </AuthContext.Provider>
  );
}
