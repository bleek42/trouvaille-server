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
    this.googleMapsClient
      .directions({
        params: {
          origin,
          destination,
          key: API_KEY,
        },
      })
      .then((res) => {
        const { steps } = res.data.routes[0].legs[0];
        console.log(steps);
        return steps;
      })
      .catch((err) => console.error(err));
  },

  getPlaces(steps, query = '', radius = 10000) {
    const places = [];
    for (let i = 0; i < steps.length; i++) {
      console.log(steps[i]);
      this.googleMapsClient
        .textSearch({
          params: {
            query,
            location: steps[i].end_location,
            radius,
            type: 'tourist_attraction',
            key: API_KEY,
          },
        })
        .then((res) => {
          console.log(res.data);
          return res.data.results.forEach((result) => places.push(result));
        })
        .catch((err) => console.error(err));
    }
  },
};

// const start = 'place_id:ChIJaRPGrLxrrIkR--TUxRh2DPA';
// const finish = 'place_id:ChIJlwTn0JFdxokRB2e-P-ror2Q';

// console.log(waypointsService.getDirections(start, finish));

// const main = async () => {
//   try {
//     const directions = await waypointsService.getDirections(start, finish);
//     if (directions && directions.length > 1) {
//       const places = await waypointsService.getPlaces(directions);
//       return places;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
// console.log(waypointsService.getDirections(start, finish));
// console.log(main());

module.exports = waypointsService;
