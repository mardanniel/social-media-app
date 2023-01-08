import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import { FormResult } from '../../shared/types';

export default function Login() {
  const [result, setResult] = useState<FormResult>(null!);
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuth } = useContext(AuthContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  return (
    <form
      onSubmit={handleLogin}
      className='w-full flex flex-col items-center gap-4'
    >
      {result?.error?.general && (
        <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
          <span className='font-medium'>{result?.error?.general?.msg}</span>
        </p>
      )}
      <input
        type='email'
        name='email'
        id='email'
        placeholder='Email or phone number'
        className='w-full bg-[#181A1B] p-4 border border-gray-700 rounded-md'
        onChange={handleInputChange}
        value={formData.email}
        required
      />
      <input
        type='password'
        name='password'
        id='password'
        placeholder='Password'
        className='w-full bg-[#181A1B] p-4 border border-gray-700 rounded-md'
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
