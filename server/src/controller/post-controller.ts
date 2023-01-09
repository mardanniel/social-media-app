import express, { Request, Response } from 'express';
import { paginationValues } from '../middleware/paginationValues';
import { upsertPostsValidation } from '../middleware/validation/upsertPostValidation';
import PostModel from '../models/post-model';

type PaginationQueryString = {
  page: number;
  perPage: number;
};

const postRouter = express.Router();

postRouter.get(
  '/',
  paginationValues,
  (req: Request<{}, {}, {}, PaginationQueryString>, res: Response) => {
    let { perPage, page } = req.query;
    PostModel.aggregate(
      [
        { $match: { creator: req.session.user?._id } },
        { $sort: { createdAt: -1 } },
        { $skip: Number(perPage * (page - 1)) },
        { $limit: Number(perPage) },
        {
          $lookup: {
            from: 'reactions',
            localField: '_id',
            foreignField: 'post',
            as: 'reaction_details',
            pipeline: [
              {
                $facet: {
                  total_reactions: [
                    { $match: { user: req.session.user?._id } },
                    { $count: 'count' },
                  ],
                  did_react: [
                    { $match: { user: req.session.user?._id } },
                    { $project: { _id: 1, reaction: 1, user: 1, post: 1 } },
                  ],
                },
              },
              { $unwind: '$total_reactions' },
              { $unwind: '$did_react' },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            context: 1,
            image: 1,
            creator: 1,
            createdAt: 1,
            updatedAt: 1,
            reaction_details: {
              total_reactions: 1,
              did_react: 1,
            },
          },
        }
      ],
      (aggregateError, result) => {
        if (aggregateError)
          return res.status(404).json({
            error: {
              msg: 'Unexpected error occurred. Please try again later.',
              error: aggregateError,
            },
          });
        PostModel.populate(
          result,
          {
            path: 'creator',
            select: 'avatar firstName lastName',
          },
          (error, posts) => {
            if (aggregateError)
              return res.status(404).json({
                error: {
                  msg: 'Unexpected error occurred. Please try again later.',
                  error: error,
                },
              });
            return res.status(200).json({
              success: posts,
            });
          }
        );
        return;
      }
    );
  }
);

postRouter.post(
  '/upsert',
  upsertPostsValidation,
  async (req: Request, res: Response) => {
    let { context, _id } = req.body;

    if (_id === undefined || _id === null) {
      PostModel.create(
        {
          context: context,
          creator: req.session.user?._id,
        },
        (error, createdPost) => {
          if (error) return res.status(404).json({ error: error });
          createdPost.populate(
            { path: 'creator', select: 'avatar firstName lastName' },
            (err, post) => {
              if (err) return res.status(404).json({ error: error });
              return res.status(201).json({ success: post });
            }
          );
          return;
        }
      );
    } else {
      PostModel.findOneAndUpdate(
        { _id: _id, creator: req.session.user?._id },
        { context: context, updatedAt: Date.now() },
        { new: true },
        (error, updatedPost) => {
          if (error) return res.status(404).json({ error: error });
          if (updatedPost === null)
            return res.status(404).json({
              error: {
                msg: 'Post item not updated.',
              },
            });
          updatedPost.populate(
            { path: 'creator', select: 'avatar firstName lastName' },
            (err, post) => {
              if (err) return res.status(404).json({ error: error });
              return res.status(201).json({ success: post });
            }
          );
          return;
        }
      );
    }
  }
);

postRouter.delete('/delete', (req: Request, res: Response) => {
  let userID = req.session.user?._id;
  let postID = req.body._id;
  PostModel.findOneAndDelete(
    { _id: postID, creator: userID },
    {},
    (error, post) => {
      if (error) return res.status(404).json({ error: error });
      return res.status(200).json({ success: post });
    }
  );
});

export default postRouter;
