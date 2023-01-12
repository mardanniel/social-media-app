import { Reaction } from '../../context/post-context';

export type FetchData = {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  url: string;
  data?: {
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

export type Post = {
  _id: string;
  creator?: {
    avatar: string;
    firstName: string;
    lastName: string;
  };
  context?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  reaction_details?: PostReactionDetails;
};

export type PostReactionDetails = {
  total_reactions?: {
    count: number;
  };
  did_react?: {
    _id: string;
    reaction: Reaction;
    user: string;
    post: string;
  };
};
