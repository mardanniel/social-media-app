import React from 'react';
import usePostsLoader from '../../hooks/usePostsLoader';
import PostItem from './post-item';
import PostLoading from './post-loading';

export default function PostList() {
  const { posts, error, isLoading, setPagination } = usePostsLoader();
  return (
    <ul>
      {posts.length
        ? posts?.map((post) => <PostItem key={post._id} post={post} />)
        : null}
      {isLoading ? (
        <PostLoading />
      ) : error === null ? (
        <div className='bg-zinc-900 mt-4 p-2 text-center rounded-md'>
          <button
            onClick={() => {
              setPagination((value) => {
                return { ...value, page: value.page + 1 };
              });
            }}
          >
            Load More
          </button>
        </div>
      ) : null}
    </ul>
  );
}
