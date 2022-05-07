import type { Request, Response, NextFunction } from 'express';

import { JsonWebTokenError } from 'jsonwebtoken';
import AuthService from '../auth/auth-service';

const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer')) {
    res.status(401).json({ error: 'Missing bearer token' });
  }
  bearerToken = authToken.slice(7, authToken.length);

  try {
    const payload = AuthService.verifyJWT(bearerToken);
    const user = await AuthService.getUserName(req.app.get('db'), payload.subject);
    if (!user) res.status(401).json({ error: 'Unauthorized request' });

    req.user = user;
    next();
  } // prettier-ignore
  catch (error) {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ error: 'Unauthorized request' });
    }
    next(error);
  }
};

export default requireAuth;
