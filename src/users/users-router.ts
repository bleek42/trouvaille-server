import type { Request, Response, NextFunction } from 'express';

import path from 'path';
import express from 'express';

import usersService from './users-service';

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json({
        message: 'ERROR: User registraion fields cannot be blank.',
      });
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        message: 'ERROR: Passwords do not match.',
      });
    }

    try {
      const passwordError = await usersService.validatePassword(password);

      if (passwordError) res.status(400).json({ error: passwordError });

      const usernameIsTaken = await usersService.checkUsers(req.app.get('db'), username);

      if (usernameIsTaken) {
        res.status(400).json({ message: `ERROR: username ${username} is unavailable.` });
      }

      const hashedPassword = await usersService.hashPassword(password);

      const newUser = {
        username,
        password: hashedPassword,
        email,
      };

      const registerNewUser = await usersService.insertUser(req.app.get('db'), newUser);

      res
        .status(201)
        .location(path.posix.join('/login'))
        .json(usersService.sanitizeUser(registerNewUser));
    }
    catch (error) {
      next(error);
    }
  }
);

export default usersRouter;
