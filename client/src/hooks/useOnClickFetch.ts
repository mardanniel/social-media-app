import React, { useState } from 'react';
import axiosInstance from '../shared/config/axios';
import { FetchData, FormResult } from '../shared/types';

export default function useOnClickFetch() {
  const [result, setResult] = useState<FormResult>(null!);
  const [isLoading, setIsLoading] = useState(false);

  const call = async (
    callData: FetchData,
    onSuccess: (successResult: any) => void
  ) => {
    setResult(null!);
    setIsLoading(true);

    await axiosInstance({
      method: callData.method,
      url: callData.url,
      data: JSON.stringify(callData.data),
    })
      .then((response) => {
        if (response.data?.success) {
          setResult(response.data);
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        setResult(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { result, isLoading, call };
}
