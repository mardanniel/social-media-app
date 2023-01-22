import { Request, Response, NextFunction } from 'express';
import { param, validationResult } from 'express-validator';
import UserModel from '../../models/user-model';

export const userIdParam = [
  param('userId')
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage('User ID is not valid.')
    .bail()
    .custom((_id) => {
      return UserModel.exists({ _id: _id })
        .then((postID) => {
          if (postID === null) {
            return Promise.reject('User ID is not available.');
          }
          return true;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return next();
  },
];
