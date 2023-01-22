import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../context/post-context';
import { axiosInstance, cancelTokenSource } from '../shared/config/axios';
import { Post } from '../shared/types';

export default function usePostsLoader() {
  const { posts, insertPost, clearPosts } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const fetchPosts = async () => {
    setIsLoading(true); 
    setError(null!);
    await axiosInstance({
      url: `/api/post?page=${pagination.page}&perPage=${pagination.perPage}`,
      method: 'GET',
    })
      .then((response) => {
        insertPost(...(response.data.success as Post[]));
      })
      .catch((error) => {
        console.log(error);
        if (axios.isCancel(error)) {
          console.log('Request Cancelled.');
          return;
        }
        setError(error.response.data);
      })
      .finally(() => setIsLoading(false));

    return () => {
      cancelTokenSource.cancel('Operation cancelled.');
      clearPosts();
    };
  }

  useEffect(() => {
    fetchPosts();
  }, [pagination.page]);

  return { isLoading, posts, error, pagination, setPagination };
}
