import {
  PostReactionDetails,
  ReactionAction,
  ReactionState,
  ReactionType,
} from '../types';

export const initialReactionState: ReactionState = {
  count: 0,
  did_react: null!,
};

export function postReactionReducer(
  state: ReactionState,
  action: ReactionAction & PostReactionDetails
) {
  switch (action.type) {
    case ReactionType.SET:
      return {
        did_react: action.did_react,
        count: action.total_reactions?.count ?? 0,
      };
    case ReactionType.LIKE:
      return { did_react: action.info, count: state.count + 1 };
    case ReactionType.NO_REACTION:
      return { did_react: undefined, count: state.count - 1 };
    default:
      return state;
  }
}
