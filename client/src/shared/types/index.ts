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
    reaction: ReactionType;
    user: string;
    post: string;
  };
};

export enum ReactionType {
  SET = 1,
  LIKE = 2,
  LAUGH = 3,
  HEART = 4,
  CARE = 5,
  SAD = 6,
  ANGRY = 7,
  NO_REACTION = 8,
}

export type ReactionAction = {
  type: ReactionType;
  info?: {
    _id: string;
    reaction: ReactionType;
    user: string;
    post: string;
  };
};

export type ReactionState = {
  did_react?: {
    _id: string;
    reaction: ReactionType;
    user: string;
    post: string;
  };
  count: number;
};
