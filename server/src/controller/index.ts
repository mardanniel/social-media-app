import express from 'express';
import { checkAuthentication } from '../middleware/checkAuthentication';
import postRouter from './post-controller';
import authRouter from './auth-controller';
import userRouter from './user-controller';
import reactionRouter from './reaction-controller';
import friendshipRouter from './friendship-controller';

const api = express.Router();

api.use('/auth', authRouter);
api.use('/post', checkAuthentication, postRouter);
api.use('/user', checkAuthentication, userRouter);
api.use('/reaction', checkAuthentication, reactionRouter);
api.use('/friendship', checkAuthentication, friendshipRouter);

export default api;