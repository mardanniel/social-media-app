import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import useOnClickFetch from '../../hooks/useOnClickFetch';

export default function Login() {
  const { result, isLoading, call } = useOnClickFetch();
  const { checkAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    call(
      {
        method: 'POST',
        url: '/api/auth/login',
        data: formData,
      },
      (onSuccessResult) => {
        checkAuth();
      }
    );
  };

  return (
    <form
      onSubmit={handleLogin}
      className='w-full flex flex-col items-center gap-4'
    >
      {result?.error?.general && (
        <p className='mt-2 text-sm text-red-600'>
          <span className='font-medium'>{result?.error?.general?.msg}</span>
        </p>
      )}
      <input
        type='email'
        name='email'
        id='email'
        placeholder='Email or phone number'
        className='w-full bg-zinc-800 p-4 border border-gray-700 rounded-md'
        onChange={handleInputChange}
        value={formData.email}
        required
      />
      {result?.error?.email && (
        <p className='text-sm text-red-600'>
          <span className='font-medium'>{result?.error?.email?.msg}</span>
        </p>
      )}
      <input
        type='password'
        name='password'
        id='password'
        placeholder='Password'
        className='w-full bg-zinc-800 p-4 border border-gray-700 rounded-md'
        onChange={handleInputChange}
        value={formData.password}
        required
      />
      <button
        type='submit'
        className='w-full bg-[#1877F2] rounded-md p-3 font-bold text-xl disabled:bg-[#373c36]'
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <a href='#' className='text-[#1877F2] text-sm mb-2'>
        Forgot Password?
      </a>
      <hr className='w-full h-px bg-gray-200 border-0 dark:bg-gray-700' />
    </form>
  );
}
