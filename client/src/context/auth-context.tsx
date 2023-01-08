import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

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

export default function AuthProvider() {
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