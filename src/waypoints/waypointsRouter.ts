import type { Request, Response, NextFunction } from 'express';

import { Router } from 'express';

import { isValidWaypointReq } from '../utils/validator';
import waypointsService from './waypointsService';
import config from '../config';

const waypointsRouter = Router();
let origin = 'New+York';
let dest = 'Los+Angeles';

waypointsRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // let origin = req.body.origin;
    // let dest = req.body.dest;
    // let query = req.body.query;
    // let radius = req.body.radius;
    // if (!origin || !dest || !query) {
    //   res.send(404, 'missing required field');
    // }

    const { origin, destination, query, radius } = req.body;
    if (!origin || !destination || !query) {
      res.status(400).json({
        message: 'ERROR: Invalid request! Required fields: "origin", "destination", & "query",',
      });
    }

    if (!isValidWaypointReq(origin, destination)) {
      res.status(400).json({
        message:
          'ERROR: Invalid request! Fields "origin" and/or "destination" not in Google Maps acceptable format.',
      });
    }

    if (radius > 50) {
      res.status(400).json({
        message: 'ERROR: Invalid request! Filed "radius" cannot be greater than 50 miles.',
      });
    }

    const directions = await waypointsService.getDirections(origin, destination);
    console.log(directions);

    if (!directions.steps.length) {
      res.status(404).json({
        message: `ERROR: No directions found for origin ${origin} & destination ${destination}`,
      });
    }
    const { steps } = directions;

    // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${config.API_KEY}`;
    // waypointsService.getPoints(url, origin).then((data) => {
    //   if (!data || data.length < 1) {
    //     res.send(400, 'no route found');
    //   }

    //   data = { ...data, query, radius };
    //   waypointsService.fetchWaypoints(data).then((places) => {
    //     const filteredList = Array.from(
    //       new Set(places.points.map((a) => a.id))
    //     ).map((id) => {
    //       return places.points.find((a) => a.id === id);
    //     });
    //     places.points = filteredList;
    //     res.send(200, JSON.stringify(places));
    //   });
    // });
  }
);

waypointsRouter.post(
  '/nearby',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.body.lat || !req.body.lng || !req.body.query) {
      res
        .status(400)
        .json({ message: 'ERROR: Invalid request! Required fields missing in request body.' });
    }
    const coords = {
      points: [{ lat: req.body.lat, lng: req.body.lng }],
      query: req.body.query,
    };
    waypointsService.fetchWaypoints(coords).then((places) => {
      if (places.points.length > 0) {
        res.status(200).json(places);
      } else {
        res.status(200).send({ message: 'no data found sorry buddy' });
      }
    });
  }
);

waypointsRouter.route('/photo').post(async (req, res, next) => {
  let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.body.photo_reference}&key=${config.API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  } catch (error) {
    //prettier-ignore
    console.error(error);
  }
});

module.exports = waypointsRouter;
