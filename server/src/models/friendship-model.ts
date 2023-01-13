import { Document, model, ObjectId, Schema, Types } from 'mongoose';

export interface IFriendship extends Document {
  user_a: string | ObjectId;
  user_b: string | ObjectId;
}

const friendshipSchema = new Schema<IFriendship>(
  {
    user_a: { type: Types.ObjectId, ref: 'user' },
    user_b: { type: Types.ObjectId, ref: 'user' },
  },
  { timestamps: true }
);

friendshipSchema.virtual('friend', {
  ref: 'user',
  localField: 'friend',
  foreignField: '_id',
  justOne: true
});

const FriendshipModel = model<IFriendship>('friendship', friendshipSchema);

export default FriendshipModel;