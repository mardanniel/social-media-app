import React from 'react';
import usePostsLoader from '../../hooks/usePostsLoader';
import PostItem from './post-item';

export default function PostList() {
  const { posts } = usePostsLoader();
  return <ul>
    {posts?.map((post) => <PostItem key={post._id} post={post}/>)}
  </ul>;
}
