import express, { Request, Response } from 'express';
import { ReactionModel } from '../models/reaction-model';

const reactionRouter = express.Router();

/**
 * Required:
 * reaction: Type of reaction (e.g. Like, Heart, etc)
 * userID: User ID
 * postID: Post ID
 *
 * Optional:
 * reactionID: Reaction ID
 *
 * Pseudocode:
 * If reactionID is
 */

reactionRouter.post('/add', (req: Request, res: Response) => {
  let { reaction, userID, postID } = req.body;
  ReactionModel.create(
    {
      reaction: reaction,
      user: userID,
      post: postID,
    },
    (error, createdReaction) => {
      if (error) return res.status(404).json({ error: error });
      return res.json({ success: createdReaction });
    }
  );
});

reactionRouter.patch('/update', (req: Request, res: Response) => {
  let { reaction, reactionID, userID, postID } = req.body;
  ReactionModel.findOneAndUpdate(
    {
      _id: reactionID,
      user: userID,
      post: postID,
    },
    {
      reaction: reaction,
      updatedAt: Date.now(),
    },
    { new: true },
    (error, updatedReaction) => {
      if (error) return res.status(404).json({ error: error });
      if (updatedReaction === null)
        return res.status(404).json({
          error: {
            msg: 'Reaction not updated.',
          },
        });
      return res.json({ success: updatedReaction });
    }
  );
});

export default reactionRouter;
