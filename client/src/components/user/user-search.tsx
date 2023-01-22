import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useOnCallFetch from '../../hooks/useOnCallFetch';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { User } from '../../shared/types';

export default function UserSearch() {
  const { isLoading, call } = useOnCallFetch();
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const searchInputRef = useRef(null);
  const searchResultVisibility = searchInput.length < 3;

  const clearInputAndResult = () => {
    setSearchInput('');
    setSearchResult([]);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!searchResultVisibility) {
        call(
          {
            url: `/api/user/search?q=${searchInput}`,
            method: 'GET',
          },
          (successResponse) => {
            setSearchResult(successResponse.success as User[]);
          },
          (failResponse) => {
            setSearchResult([]);
          }
        );
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchResultVisibility, searchInput]);

  return (
    <div className='justify-self-center relative'>
      <input
        ref={searchInputRef}
        className='bg-zinc-800 text-white py-2 px-2 rounded-full w-96'
        type='text'
        placeholder='Search'
        onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) =>
          setSearchInput(event.currentTarget.value)
        }
      />
      <ul
        hidden={searchResultVisibility}
        className='absolute left-0 right-0 bg-zinc-900 mt-2 rounded-lg p-4'
      >
        {isLoading ? (
          <li>Loading</li>
        ) : searchResult.length ? (
          searchResult.map(({ _id, email, firstName, lastName, avatar }) => (
            <li key={_id} className='mt-1'>
              <Link
                onClick={clearInputAndResult}
                to={`profile/${_id}`}
                className='flex items-center gap-4'
              >
                <HiOutlineUserCircle size={30} />
                <span>{`${firstName} ${lastName}`}</span>
              </Link>
            </li>
          ))
        ) : (
          <li>No result for {searchInput}</li>
        )}
      </ul>
    </div>
  );
}
