const { Client } = require('@googlemaps/google-maps-services-js');
const axios = require('axios').default;

const { API_KEY } = require('../config.js');

const waypointsService = {
  axiosInstance: axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
    method: 'GET',
  }),
  googleMapsClient: new Client({ axiosInstance: this.axiosInstance }),

  getDirections(origin, destination) {
    if (!origin.startsWith('place_id:') || !origin.startsWith('place_id:')) {
      throw new Error(
        'origin and / or destination does not start with "place_id"'
      );
    }
    return this.googleMapsClient
      .directions({
        params: {
          origin,
          destination,
          key: API_KEY,
        },
      })
      .then((res) => {
        const { steps } = res.data.routes[0].legs[0].steps;

        return steps;
      })
      .catch((err) => console.error(err));
  },

  getPlaces(query, steps, radius) {
    const places = [];

    for (step of steps) {
      const location = step.end_location;
      console.log(location);

      return this.googleMapsClient
        .placesNearby({
          query,
          location,
          radius,
          type: 'tourist_attraction',
          key: API_KEY,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error(err));
    }
  },

  // fetchWaypoints({ query, points, endCoords, radius = 10000 }) {
  //   const waypoints = [];
  //   console.log(points);
  //   for (point of points) {
  //     const lat = points[point].lat;
  //     const lng = points[point].lng;
  //     const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query.join(
  //       '+OR+'
  //     )}&type=tourist_attraction&location=${lat},${lng}&radius=${radius}&key=${API_KEY}`;
  //     axios
  //       .get(url)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // },
};

// const start = 'place_id:ChIJaRPGrLxrrIkR--TUxRh2DPA';
// const finish = 'place_id:ChIJlwTn0JFdxokRB2e-P-ror2Q';

// console.log(waypointsService.getDirections(start, finish));

const myQuery = 'monuments';
const mySteps = require('./steps');
const myRadius = 10000;

console.log(waypointsService.getPlaces(myQuery, mySteps, myRadius));

module.exports = waypointsService;
