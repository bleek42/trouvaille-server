/* eslint-disable strict */
import express from 'express';
import authService from './auth-service';
const authRouter = express.Router();

authRouter.route('/login').post(async (req, res, next) => {
	const { username, password, email } = req.body;
	const reqUser = { username, password, email };
	for (const [key, value] of Object.entries(reqUser))
		if (value === null) {
			return res.status(400).json({
				error: `${key} missing in request body`
			});
		}
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

module.exports = authRouter;
