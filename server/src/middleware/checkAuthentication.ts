import { NextFunction, Request, Response } from 'express';

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  /**
   * Checks if user session exists
   */
  if (!req.session.user){
    return res.status(401).json({
      error: {
        msg: 'Unauthorized'
      }
    });
  }

  return next();
};
