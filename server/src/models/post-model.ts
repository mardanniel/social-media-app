import { model, Schema, Types, Document, ObjectId, Date } from 'mongoose';

export interface IPost extends Document {
  context: string;
  image: string;
  creator: string | ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    context: {
      type: String,
      validate: [
        (context: string) => {
          let contextValidation: RegExp = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
          return contextValidation.test(context);
        },
        'Please provide a valid context.',
      ],
      required: [true, 'Please specify a post context.'],
    },
    image: { type: String, default: '' },
    creator: { type: Types.ObjectId, ref: 'user' },
  },
  { timestamps: true }
);

const PostModel = model<IPost>('post', postSchema);

export default PostModel;
