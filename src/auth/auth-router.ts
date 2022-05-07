import type { Request, Response, NextFunction } from 'express'

import { Router} from 'express';
import AuthService from './auth-service';

const authRouter = Router();

authRouter.route('/login').post(async (req: Request, res: Response, next: NextFunction) => {
	const username = req.body?.username.trim();
  const email = req.body?.email.trim()
  const password = req.body?.password.trim()
  const userName = req.body?.confirmPassword.trim()
	// const reqUser = { username, password, email };
	// for (const [key, value] of Object.entries(req.body))
	// 	if (value === null) {
	// 		return res.status(400).json({
	// 			error: `${key} missing in request body`
	// 		});
	// 	}
	try {
		const userInDb = await authService.getUserName(
			req.app.get('db'),
			reqUser.username
		);

		if (!userInDb)
			return res.status(400).json({
				error: 'incorrect username and/or password'
			});

		const checkMatch = await authService.comparePassword(
			reqUser.password,
			userInDb.password
		);

		if (!checkMatch)
			return res.status(400).json({
				error: 'incorrect username and/or password'
			});

		const subject = userInDb.username;
		const payload = {
			user_id: userInDb.id
		};
		res.send({
			authToken: authService.createJwt(subject, payload),
			user_id: userInDb.id
		});
	} 
	catch (error) {
		next(error);
	}
});

export default authRouter;
