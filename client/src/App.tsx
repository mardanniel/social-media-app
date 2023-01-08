import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRoute from './components/user-route';
import AuthProvider from './context/auth-context';
import Entry from './pages/entry';
import Home from './pages/home';
import NotFound from './pages/not-found';
import Profile from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthProvider />}>
          <Route element={<UserRoute />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='entry' element={<Entry />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
