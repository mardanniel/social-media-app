export type FetchData = {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  url: string;
  data: {
    [input_name: string]: any;
  };
};

export type FormResult = {
  success: {
    msg: string;
  };
  error: {
    [formInput: string]: {
      msg: string;
    };
  };
};
