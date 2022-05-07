import type { Request, Response, NextFunction } from 'express';

import { config } from '../config';

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  let response;
  if (config.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error({ error });
    response = { message: error.message, error };
  }
  res.status(500).json(response);
}


