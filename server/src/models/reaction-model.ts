import { Schema, Types, model } from 'mongoose';

const reactionSchema = new Schema({
  reaction: { type: Number, default: 2 },
  user: { type: Types.ObjectId, ref: 'user' },
  post: { type: Types.ObjectId, ref: 'post' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ReactionModel = model('reaction', reactionSchema);
