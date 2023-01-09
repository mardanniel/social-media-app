import express, { Request, Response, NextFunction } from 'express';
import UserModel, { IUser } from '../models/user-model';

const userRouter = express.Router();

userRouter.get('/', (req: Request, res: Response) => {
  const { user: authUser } = req.session;
  UserModel.findOne(
    { _id: authUser?._id },
    { password: 0 },
    (error: any, user: IUser) => {
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
          user: user,
        },
      });
    }
  );
});

userRouter.get('/:id', (req: Request, res: Response) => {});

export default userRouter;
