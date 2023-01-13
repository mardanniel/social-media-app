import { createContext, useState } from 'react';
import { Post } from '../shared/types';

export enum Reaction {
  Like = 2,
  Heart = 3,
  Care = 4,
  Laugh = 5,
  Sad = 6,
  Angry = 7,
}

interface PostContextType {
  posts: Post[];
  clearPosts: () => void;
  unshiftPost: (post: Post) => void;
  insertPost: (...post: Post[]) => void;
  updatePost: (updatedPost: Post) => void;
  removePost: (postID: string) => void;
}

export const PostContext = createContext<PostContextType>(null!);

export function PostProvider({ children }: React.PropsWithChildren) {
  const [posts, setPosts] = useState<Post[]>([]);

  // For cleanup
  const clearPosts = () => {
    setPosts([]);
  };

  // Creating Post
  const unshiftPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  // Appending Post
  const insertPost = (...posts: Post[]) => {
    // setPosts((prevPosts) => [...prevPosts, ...posts]);
    setPosts((prevPosts) => {
      let newPosts = posts.filter(
        (post, postIndex) =>
          prevPosts.findIndex(
            (prevPost, prevPostIndex) => prevPost._id === post._id
          ) === -1
      );

      return [...prevPosts, ...newPosts];
    });
  };

  // Updating Post
  const updatePost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? { ...post, ...updatedPost } : post
      )
    );
  };

  // Deleting Post
  const removePost = (postID: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postID));
  };

  const postValue = {
    posts,
    clearPosts,
    unshiftPost,
    insertPost,
    updatePost,
    removePost,
  };

  return (
    <PostContext.Provider value={postValue}>{children}</PostContext.Provider>
  );
}
