import { useContext, useReducer } from 'react';
import { BsHeart } from 'react-icons/bs';
import { MdAddReaction, MdComment } from 'react-icons/md';
import { AuthContext } from '../../context/auth-context';
import useOnClickFetch from '../../hooks/useOnClickFetch';
import {
  initialReactionState,
  postReactionReducer,
  ReactionAction,
  ReactionState,
  ReactionType,
} from '../../shared/reducer/postReactionReducer';
import { FetchData, PostReactionDetails } from '../../shared/types';

export default function PostReaction({
  postID,
  reactionDetails,
}: {
  postID: string;
  reactionDetails?: PostReactionDetails;
}) {
  initialReactionState.count = reactionDetails?.total_reactions?.count ?? 0;
  initialReactionState.did_react = reactionDetails?.did_react !== undefined;

  const [reactionState, dispatch] = useReducer(
    postReactionReducer,
    initialReactionState
  );

  const handleOnReact = () => {
    console.log('hello');
  };

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between px-2'>
        <div className='flex gap-1 items-center'>
          <MdAddReaction size={20} />
          <div>{reactionState.count}</div>
        </div>
        <div className='flex gap-1 items-center'>
          <MdComment size={20} />0
        </div>
      </div>
      <hr className='my-2' />
      <div className='flex justify-around px-2'>
        <PostReactionHandler
          postID={postID}
          reactionState={reactionState}
          reactionDispatch={dispatch}
        />
        <PostCommentHandler />
      </div>
    </div>
  );
}

function PostReactionHandler({
  postID,
  reactionState,
  reactionDispatch,
}: {
  postID: string;
  reactionState: ReactionState;
  reactionDispatch: React.Dispatch<ReactionAction>;
}) {
  const { isLoading, result, call } = useOnClickFetch();
  const { user } = useContext(AuthContext);

  const handleOnReact = () => {
    

    let config: FetchData = {
      url: 'api/reaction/add',
      method: 'POST',
      data: {
        reaction: 2,
        userID: user._id,
        postID: postID,
      },
    };

    call(config, (successResult) => {
      console.log(successResult.success.reaction);
      reactionDispatch({ type: ReactionType.LIKE });
    });
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleOnReact}
      className='flex gap-1 items-center justify-center'
    >
      <BsHeart fill={reactionState.did_react ? 'red' : 'white'} />
      <span>Like</span>
    </button>
  );
}

function PostCommentHandler() {
  return (
    <button className='flex gap-1 items-center justify-center'>
      <MdComment size={20} />
      <span>Comment</span>
    </button>
  );
}
