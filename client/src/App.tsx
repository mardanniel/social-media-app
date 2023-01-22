import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppLoading from './components/app-loading';
import GuestRoute from './components/route/guest-route';
import UserRoute from './components/route/user-route';
import AuthProvider from './context/auth-context';
import Profile from './pages/profile';

const Entry = lazy(() => import('./pages/entry'));
const Home = lazy(() => import('./pages/home'));
const NotFound = lazy(() => import('./pages/not-found'));
const SearchedProfile = lazy(() => import('./pages/searched-profile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoading />}>
        <Routes>
          <Route path='/' element={<AuthProvider />}>
            <Route element={<UserRoute />}>
              <Route index element={<Home />} />
              <Route path='profile' element={<SearchedProfile />} />
              <Route
                path='profile/:userId'
                element={<Profile />}
                errorElement={<NotFound />}
              />
            </Route>
            <Route element={<GuestRoute />}>
              <Route path='entry' element={<Entry />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
