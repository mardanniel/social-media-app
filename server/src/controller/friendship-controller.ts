import express, { Request, Response } from 'express';
import { paginationQuery } from '../middleware/validation/paginationQuery';
import FriendshipModel from '../models/friendship-model';
import { PaginationQueryString } from '../shared/types';

const friendshipRouter = express.Router();

friendshipRouter.get(
  '/',
  paginationQuery,
  (req: Request<{}, {}, {}, PaginationQueryString>, res: Response) => {
    let { perPage, page } = req.query;

    FriendshipModel.aggregate(
      [
        {
          $match: {
            $or: [
              { user_a: req.session.user?._id },
              { user_b: req.session.user?._id },
            ],
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: Number(perPage * (page - 1)) },
        { $limit: Number(perPage) },
        {
          $project: {
            _id: 1,
            friend: {
              $cond: {
                if: { $eq: ['$user_a', req.session.user?._id] },
                then: '$user_b',
                else: '$user_a',
              }

            },
          },
        },
      ],
      (aggregateError, result) => {
        if (aggregateError)
          return res.status(404).json({
            error: {
              msg: 'Unexpected error occurred. Please try again later.',
              error: aggregateError,
            },
          });

        FriendshipModel.populate(
          result,
          { path: 'friend', select: '_id avatar firstName lastName' },
          (error, friends) => {
            if (error)
              return res.status(404).json({
                error: {
                  msg: 'Unexpected error occurred. Please try again later.',
                  error: error,
                },
              });

            return res.status(200).json({
              success: friends,
            });
          }
        );
        return;
      }
    );
  }
);

friendshipRouter.post('/add', (req: Request, res: Response) => {
  let { toBeAdded } = req.body;
  FriendshipModel.create(
    {
      user_a: req.session.user?._id,
      user_b: toBeAdded,
    },
    (error, createdFriendShip) => {
      if (error) return res.status(404).json({ error: error });
      createdFriendShip.populate(
        [
          { path: 'user_a', select: 'avatar firstName lastName' },
          { path: 'user_b', select: 'avatar firstName lastName' },
        ],
        (err, friendship) => {
          if (err) return res.status(404).json({ error: err });
          return res.status(201).json({ success: friendship });
        }
      );
      return;
    }
  );
});

friendshipRouter.post('/remove', (req: Request, res: Response) => {
  let { friendshipID } = req.body;
  FriendshipModel.findOneAndDelete(
    { _id: friendshipID },
    {},
    (error, deletedFriendship) => {
      if (error) return res.status(404).json({ error: error });
      return res.status(200).json({ success: deletedFriendship });
    }
  );
});

export default friendshipRouter;
