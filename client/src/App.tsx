import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider, PrivateRoute } from './context/auth-context';
import NotFound from './pages/not-found';
import Entry from './pages/entry';
import Home from './pages/home';
import Profile from './pages/profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthProvider />}>
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
          </Route>

          {/* Login/SignUp Route */}
          <Route path='entry' element={<Entry />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
