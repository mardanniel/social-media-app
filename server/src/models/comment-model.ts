import { model, ObjectId, Schema, Types, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  user: string | ObjectId;
  post: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: { type: String },
    user: { type: Types.ObjectId, ref: 'user' },
    post: { type: Types.ObjectId, ref: 'post' },
  },
  { timestamps: true }
);

const CommentModel = model<IComment>('comment', commentSchema);

export default CommentModel;
