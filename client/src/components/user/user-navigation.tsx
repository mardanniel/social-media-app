import { useContext, useState } from 'react';
import { GoSignOut } from 'react-icons/go';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoNotifications } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import useOnCallFetch from '../../hooks/useOnCallFetch';
import Dropdown from '../dialogs/dropdown';
import Modal from '../dialogs/modal';
import UserSearch from './user-search';

export default function UserNavigation() {
  return (
    <div className='z-50 fixed top-0 left-0 right-0 bg-zinc-900'>
      <div className='grid grid-cols-3 gap-2 py-2 px-6 items-center h-14'>
        <div className='justify-self-start'>
          <Link to={'/'} className='font-bold text-3xl'>
            Socialex
          </Link>
        </div>
        <UserSearch />
        <div className='justify-self-end'>
          <ul className='flex gap-2'>
            <li className='bg-zinc-800 rounded-full p-2'>
              <IoNotifications size={25} />
            </li>
            <UserOption />
          </ul>
        </div>
      </div>
    </div>
  );
}

function UserOption() {
  const [modalVisibility, setModalVisibility] = useState(false);
  const { isLoading, result, call } = useOnCallFetch();
  const { checkAuth } = useContext(AuthContext);

  const handleSignOut = () => {
    call(
      {
        url: '/api/auth/logout',
        method: 'DELETE',
      },
      (successResult) => {
        checkAuth();
      }
    );
  };

  return (
    <li className='bg-zinc-800 rounded-full p-2 cursor-pointer'>
      <Dropdown
        header={<HiOutlineUserCircle size={25} />}
        menuItems={[
          <button
            onClick={() => {
              setModalVisibility(true);
            }}
            className='flex items-center w-max gap-2'
          >
            <GoSignOut size={25} />
            Log out
          </button>,
        ]}
      />
      <Modal
        visible={modalVisibility}
        handleClose={() => {
          setModalVisibility(false);
        }}
      >
        <div className='bg-zinc-800 text-white flex flex-col items-center mx-auto p-10'>
          <h1>Are you sure you want to logout?</h1>
          <div className='mt-4 flex gap-2'>
            <button
              onClick={handleSignOut}
              className='bg-blue-600 px-4 py-2 rounded-md font-bold'
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  aria-hidden='true'
                  role='status'
                  className='inline w-4 h-4 mr-3 text-white animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
              ) : null}
              Yes
            </button>
            <button
              onClick={() => setModalVisibility(false)}
              className='bg-gray-800 px-4 py-2 rounded-md font-bold'
              disabled={isLoading}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </li>
  );
}
