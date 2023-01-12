import express, { Request, Response } from 'express';
import { ReactionModel } from '../models/reaction-model';

const reactionRouter = express.Router();

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

reactionRouter.delete('/delete', (req: Request, res: Response) => {
  let { reactionID } = req.body;
  ReactionModel.findOneAndDelete(
    { _id: reactionID },
    {},
    (error, deletedReaction) => {
      if (error) return res.status(404).json({ error: error });
      if (deletedReaction === null)
        return res.status(404).json({
          error: {
            msg: 'Reaction not deleted.',
          },
        });
      return res.json({ success: deletedReaction });
    }
  );
});

reactionRouter.patch('/update', (req: Request, res: Response) => {
  let { reaction, reactionID, userID, postID } = req.body;
  ReactionModel.findOneAndUpdate(
    {
      _id: reactionID,
    },
    {
      reaction: reaction,
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
