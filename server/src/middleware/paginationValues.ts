import { NextFunction, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

export const paginationValues = [
  query('page', 'Page value must be a number').isNumeric(),
  query('perPage', 'Per page value must be a number').isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    return next();
  }
];