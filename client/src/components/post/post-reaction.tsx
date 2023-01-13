import { useContext, useEffect, useReducer } from 'react';
import { BsHeart } from 'react-icons/bs';
import { MdAddReaction, MdComment } from 'react-icons/md';
import { AuthContext } from '../../context/auth-context';
import useOnClickFetch from '../../hooks/useOnClickFetch';
import {
  initialReactionState,
  postReactionReducer,
} from '../../shared/reducer/postReactionReducer';
import {
  FetchData,
  PostReactionDetails,
  ReactionAction,
  ReactionState,
  ReactionType,
} from '../../shared/types';

export default function PostReaction({
  postID,
  reactionDetails,
}: {
  postID: string;
  reactionDetails?: PostReactionDetails;
}) {
  const [reactionState, dispatch] = useReducer(
    postReactionReducer,
    initialReactionState
  );

  /**
   * This is kinda messed up but it works i guess
   */
  useEffect(() => {
    dispatch({
      type: ReactionType.SET,
      did_react: reactionDetails?.did_react,
      total_reactions: reactionDetails?.total_reactions,
    });
  }, []);

  return (
    <div className='flex flex-col p-2'>
      <div className='flex justify-between px-2'>
        <div className='flex gap-1 items-center'>
          <MdAddReaction
            size={20}
          />
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
  const { isLoading, call } = useOnClickFetch();
  const { user } = useContext(AuthContext);

  const handleOnReact = () => {
    let config: FetchData = reactionState?.did_react
      ? {
          url: 'api/reaction/delete',
          method: 'DELETE',
          data: {
            reactionID: reactionState.did_react._id,
          },
        }
      : {
          url: 'api/reaction/add',
          method: 'POST',
          data: {
            reaction: 2,
            userID: user._id,
            postID: postID,
          },
        };

    call(config, (successResult) => {
      reactionDispatch({
        type: successResult.success.reaction_type,
        info: successResult.success.reaction_info,
      });
    });
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleOnReact}
      className='flex gap-1 items-center justify-center'
    >
      <BsHeart fill={reactionState?.did_react ? 'red' : 'white'} />
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
