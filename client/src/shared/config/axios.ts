import axios from 'axios';

export const cancelTokenSource = axios.CancelToken.source();

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
  cancelToken: cancelTokenSource.token
})