import express, { Request, Response, NextFunction } from 'express';
import { searchQueryValidation } from '../middleware/validation/searchQuery';
import { userIdParam } from '../middleware/validation/userIdParam';
import FriendshipModel from '../models/friendship-model';
import PostModel from '../models/post-model';
import UserModel, { IUser } from '../models/user-model';

const userRouter = express.Router();

userRouter.get(
  '/search',
  searchQueryValidation,
  (req: Request, res: Response) => {
    let { q } = req.query;
    UserModel.aggregate(
      [
        {
          $project: {
            _id: 1,
            email: 1,
            firstName: 1,
            lastName: 1,
            avatar: 1,
          },
        },
        {
          $match: {
            $or: [{ firstName: { $regex: q } }, { lastName: { $regex: q } }],
          },
        },
      ],
      (error, result) => {
        if (error) return res.status(404).json({ error });
        return res.json({ success: result });
      }
    );
  }
);

userRouter.get(
  '/stats/:userId?',
  userIdParam,
  async (req: Request, res: Response) => {
    const { user } = req.session;
    const { userId } = req.params;

    let userToFind = userId ? userId : user?._id;

    try {
      let friendsCount = await FriendshipModel.countDocuments({
        $or: [{ user_a: userToFind }, { user_b: userToFind }],
      });

      let postCount = await PostModel.countDocuments({
        $match: {
          creator: userToFind,
        },
      });

      return res.json({
        success: {
          friends: friendsCount,
          post: postCount,
        },
      });
    } catch (error) {
      return res.status(404).json({ error });
    }
  }
);

userRouter.get('/:userId?', userIdParam, (req: Request, res: Response) => {
  const { user } = req.session;
  const { userId } = req.params;

  let userToFind = userId ? userId : user?._id;

  UserModel.findOne(
    { _id: userToFind },
    { password: 0 },
    (error: any, userResult: IUser) => {
      if (error) {
        return res.status(400).json({
          error: {
            msg: 'Unexpected error occured. Please try again later.',
            error: error,
          },
        });
      }
      return res.status(200).json({
        success: {
          msg: 'User Credentials',
          user: userResult,
        },
      });
    }
  );
});

export default userRouter;
