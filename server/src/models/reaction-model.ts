import { Schema, Types, model } from 'mongoose';

const reactionSchema = new Schema(
  {
    reaction: { type: Number, default: 2 },
    user: { type: Types.ObjectId, ref: 'user' },
    post: { type: Types.ObjectId, ref: 'post' },
  },
  { timestamps: true }
);

export const ReactionModel = model('reaction', reactionSchema);
