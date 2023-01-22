import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import PostModel from '../../models/post-model';

export const upsertPostBody = [
  body('_id')
    .optional({ nullable: true, checkFalsy: true })
    .isMongoId()
    .withMessage('Post ID is not valid.')
    .bail()
    .custom((_id) => {
      return PostModel.exists({ _id: _id })
        .then((postID) => {
          if (postID === null) {
            return Promise.reject('Post ID is not available.');
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
