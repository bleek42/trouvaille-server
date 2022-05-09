const express = require('express');

const waypointsService = require('./waypointsService');
const config = require('../config');

const waypointsRouter = express.Router();

waypointsRouter.route('/').post(async (req, res, next) => {
  const origin = req.body?.origin;
  const destination = req.body?.destination;
  const keyword = req.body?.keyword;
  const radius = req.body?.radius;

  if (!origin || !destination || !keyword) {
    res.status(400).json({
      message: 'ERROR: Invalid request! Required fields: "origin", "destination", & "query",',
    });
  }

  if (radius > 50000 || radius < 5000) {
    res.status(400).json({
      message: 'ERROR: Invalid request! "Radius" cannot be greater than 50 or less than 5 miles.',
    });
  }

  // if (!waypointsService.isValidWaypointReq(origin, destination)) {
  //   res.status(400).json({
  //     message:
  //       'ERROR: Invalid request! Fields "origin" and/or "destination" not in Google Maps acceptable format.',
  //   });
  // }

  try {
    const recommendations = await waypointsService.getRecommendations(origin, destination);
    if(!recommendations) {
      res.status(400).json({
        message: `ERROR: could not retrieve recommendations - ${recommendations}`,
      })
    }
    res.status(200).json(recommendations)
  }
  catch (err) {
    next(err);
  }
});

waypointsRouter.route('/nearby').post(async (req, res, next) => {
  if (!req.body.lat || !req.body.lng || !req.body.query) {
    res.send(400, 'missing required fields');
  }
  const coords = {
    points: [{ lat: req.body.lat, lng: req.body.lng }],
    query: req.body.query,
  };
  waypointsService.fetchWaypoints(coords).then((places) => {
    if (places.points.length > 0) {
      res.status(200).json(places);
    }
    else {
      res.status(200).send({ message: 'no data found sorry buddy' });
    }
  });
});

waypointsRouter.route('/photo').post(async (req, res, next) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.body.photo_reference}&key=${config.API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  }
  catch (error) {
    console.error(error);
  }
});

module.exports = waypointsRouter;
