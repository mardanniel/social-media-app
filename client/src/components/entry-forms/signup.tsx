import React, { useState } from 'react';
import useOnCallFetch from '../../hooks/useOnCallFetch';

type SignUpProps = {
  onSignUpSuccess: () => void;
};

export default function SignUp({ onSignUpSuccess }: SignUpProps) {
  const { result, isLoading, call } = useOnCallFetch();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  });

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    call(
      {
        method: 'POST',
        url: '/api/auth/signup',
        data: formData,
      },
      (onSuccessResult) => {
        onSignUpSuccess();
      }
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='bg-zinc-900 text-white rounded-md'>
      <div className='p-4'>
        <h1 className='font-bold text-3xl'>Sign Up</h1>
        <p className='text-gray-400'>It's quick and easy</p>
      </div>
      <hr />
      <form
        className='p-4 flex flex-col justify-center items-center gap-4 w-full'
        onSubmit={handleSignUp}
      >
        <div className='w-full flex justify-between'>
          <div>
            <input
              type='text'
              className='bg-zinc-800 p-2 border border-gray-700 rounded-md'
              placeholder='First Name'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            {result?.error?.firstName && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                <span className='font-medium'>
                  {result?.error?.firstName.msg}
                </span>
              </p>
            )}
          </div>
          <div>
            <input
              type='text'
              className='bg-zinc-800 p-2 border border-gray-700 rounded-md'
              placeholder='Last Name'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            {result?.error?.lastName && (
              <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
                <span className='font-medium'>
                  {result?.error?.lastName.msg}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className='w-full'>
          <input
            type='text'
            className='w-full bg-zinc-800 p-2 border border-gray-700 rounded-md'
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {result?.error?.email && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>{result?.error?.email.msg}</span>
            </p>
          )}
        </div>
        <div className='w-full'>
          <input
            type='password'
            className='w-full bg-zinc-800 p-2 border border-gray-700 rounded-md'
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {result?.error?.password && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>{result?.error?.password.msg}</span>
            </p>
          )}
        </div>
        <div className='w-full'>
          <input
            type='password'
            className='w-full bg-zinc-800 p-2 border border-gray-700 rounded-md'
            placeholder='Confirm Password'
            name='passwordConfirm'
            value={formData.passwordConfirm}
            onChange={handleInputChange}
            required
          />
          {result?.error?.passwordConfirm && (
            <p className='mt-2 text-sm text-red-600 dark:text-red-500'>
              <span className='font-medium'>
                {result?.error?.passwordConfirm.msg}
              </span>
            </p>
          )}
        </div>
        <button
          className='bg-[#2B831A] px-10 py-2 rounded-md font-bold my-2 disabled:bg-[#373c36]'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
