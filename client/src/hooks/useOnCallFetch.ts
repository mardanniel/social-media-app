import React, { useState } from 'react';
import { axiosInstance } from '../shared/config/axios';
import { FetchData, FormResult } from '../shared/types';

export default function useOnCallFetch() {
  const [result, setResult] = useState<FormResult>(null!);
  const [isLoading, setIsLoading] = useState(false);

  const call = async (
    callData: FetchData,
    onSuccess?: (successResult: any) => void,
    onFail?: (errorResponse: any) => void
  ) => {
    setResult(null!);
    setIsLoading(true);

    let config = {
      method: callData.method,
      url: callData.url,
    };

    if (callData.data) {
      Object.assign(config, { data: JSON.stringify(callData.data) });
    }

    await axiosInstance(config)
      .then((response) => {
        if (response.data?.success) {
          setResult(response.data);
          onSuccess?.(response.data);
        }
      })
      .catch((error) => {
        onFail?.(error.response.data);
        setResult(error.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { result, isLoading, call };
}
