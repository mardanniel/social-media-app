import express, { NextFunction, Request, Response } from 'express';
import UserModel, { IUser } from '../models/user-model';
import { Error } from 'mongoose';
import { checkAuthentication } from '../middleware/checkAuthentication';
import { MappedValidationError } from '../shared/error/mapped-validation-error';

const authRouter = express.Router();

authRouter.post('/login', async (req: Request, res: Response) => {
  let { email: inputEmail, password: inputPassword } = req.body;

  UserModel.findOne(
    {
      email: inputEmail,
    },
    (error: any, user: IUser) => {
      if (error)
        return res.status(404).json({
          error: {
            general: {
              msg: 'Unexpected error occurred. Please try again later.',
              error: error,
            },
          },
        });

      if (user === null)
        return res.status(400).json({
          error: {
            email: {
              msg: 'No records using this email.',
            },
          },
        });

      let valid = user.validPassword(inputPassword);

      if (!valid) {
        return res.status(400).json({
          error: {
            general: {
              msg: 'Email/Password incorrect.',
            },
          },
        });
      }

      req.session.user = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      return res.status(200).json({
        success: {
          msg: 'Login Successful.',
        },
      });
    }
  );
});

authRouter.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, password, passwordConfirm } = req.body;
    const user = new UserModel({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      passwordConfirm: passwordConfirm,
    });

    await user.save();
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return res.status(400).json({ error: new MappedValidationError(error) });
    }

    return res.status(400).json({
      error: 'Unexpected error occured. Please try again later.',
      exception: error,
    });
  }

  return res.status(201).json({ success: 'Sign Up Successful!' });
});

authRouter.get('/check-auth', (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  return res.status(200).json(req.session.user);
});

authRouter.delete(
  '/logout',
  checkAuthentication,
  async (req: Request, res: Response) => {
    req.session.destroy((error) => {
      if (error) {
        return res.status(404).json({
          error: {
            msg: 'An unexpected error occured. Please try again later.',
          },
        });
      }

      return res.status(200).json({
        success: {
          msg: 'Logout Successful!',
        },
      });
    });
  }
);

export default authRouter;
