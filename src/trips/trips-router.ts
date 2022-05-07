import type { Request, Response, NextFunction } from 'express';

import express from 'express';
import tripsService from './trips-service';

const tripsRouter = express.Router();

tripsRouter
  .route('/:user_id')
  .get(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params?.userId;
      const trips = await tripsService.getUserTrips(req.app.get('db'), id);
      if (trips.length === 0) {
        res.status(204).json({
          message: 'Cannot find any existing trips.',
        });
      } else {
        res.status(200).json(trips);
      }
    } catch (error) {
      // prettier-ignore
      next(error);
    }
  });

tripsRouter
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      id,
      title,
      origin,
      destination,
      tripKeywords,
      steps,
      waypoints,
      originName,
      destinationName,
      distance,
      hasStarted,
    } = req.body;
    // const user = req.user.userId
    try {
      const userPost = {
        origin,
        destination,
        waypoints,
        // user_id,
        originName,
        destinationName,
      };
      const newTrip = await tripsService.addUserTrip(req.app.get('db'), userPost);
      if (!newTrip) {
        res.status(400).json({
          message: 'ERROR: ... idk some error?',
        });
      }

      res.status(200).json(newTrip);
    } catch (error) {
      // prettier-ignore
      next(error);
    }
  });

export default tripsRouter;
