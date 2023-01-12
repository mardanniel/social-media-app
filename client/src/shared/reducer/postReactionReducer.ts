export type ReactionState = {
  did_react: boolean
  count: number;
};

export enum ReactionType {
  LIKE = 2,
  NO_REACTION,
}

export type ReactionAction = {
  type: ReactionType;
};

export const initialReactionState = {
  did_react: false,
  count: 0,
};

export function postReactionReducer(
  state: ReactionState,
  action: ReactionAction
) {
  switch (action.type) {
    case ReactionType.LIKE:
      return { did_react: true, count: state.count + 1 };
    case ReactionType.NO_REACTION:
      return { did_react: false, count: state.count - 1 };
    default:
      return state;
  }
}
