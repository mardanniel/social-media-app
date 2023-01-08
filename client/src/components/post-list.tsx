import React from 'react';
import PostItem from './post-item';

type PostItemProps = {
  postOwnership?: string;
};

export default function PostList({ postOwnership }: PostItemProps) {
  return (
    <ul>
      <PostItem />
      <PostItem />
      <PostItem />
    </ul>
  );
}
