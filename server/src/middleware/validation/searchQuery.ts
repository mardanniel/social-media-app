import { query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const searchQueryValidation = [
  query('q').not().isEmpty({ ignore_whitespace: true }).trim().escape(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return next();
  },
];
