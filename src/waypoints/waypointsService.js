import { Client } from '@googlemaps/google-maps-services-js';
import axios from 'axios';

import { config } from '../config.js';

import { createIterableStream, writeFileIterator } from '../utils/asyncIterator.js';

// const googleMapsClient = new Client({ axiosInstance });

export class WaypointsService extends Client {
  constructor(axiosInstance) {
    super(axiosInstance);
    this.axiosInstance =
      axiosInstance ||
      axios.create({
        baseURL: 'https://maps.googleapis.com/maps/api',
        method: 'GET',
      });
  }

  async getDirections(origin, destination) {
    const results = [];
    try {
      const directions = await this.directions({
        params: {
          origin,
          destination,
          key: config.MAPS_API_KEY,
        },
      });
      const steps = directions.data?.routes[0]?.legs[0]?.steps;
      if (steps && steps.length > 1) {
        for await (const step of steps) {
          results.push(step);
        }
      }
      console.log(results);
      return results;
    } catch (err) {
      console.error(err);
    } finally {
      console.info('reached finally block!');
    }
  }

  async getPlaces(steps, query, radius = 50) {
    const places = [];
    try {
      console.log('try');
    } catch (err) {
      console.error('catch', { err });
    } finally {
    }
  }
}

const start = 'place_id:ChIJaRPGrLxrrIkR--TUxRh2DPA';
const finish = 'place_id:ChIJlwTn0JFdxokRB2e-P-ror2Q';

const waypointsService = new WaypointsService();
waypointsService.getDirections(start, finish);

// const waypointsService = {
//   getDirections(origin, destination) {
//     this.axiosInstance.interceptors.response.use(async (res) => {
//       const jsonWritable = JSON.stringify(res);
//       await writeFileIterator(jsonWritable, './directions.json');
//     });
//     this.googleMapsClient
//       .directions({
//         params: {
//           origin,
//           destination,
//           key: config.MAPS_API_KEY,
//         },
//       })
//       .then((res) => {
//         const { steps } = res.data.routes[0].legs[0];
//       })
//       .catch((err) => console.error(err));
//   },

//   getPlaces(steps, query = 'monuments', radius = 50) {
//     const places = [];
//     for (let i = 0; i < steps.length; i++) {
//       console.log(steps[i]);
//       this.googleMapsClient
//         .textSearch({
//           params: {
//             query,
//             location: steps[i].end_location,
//             radius,
//             type: 'tourist_attraction',
//             key: config.MAPS_API_KEY,
//           },
//         })
//         .then((res) => {
//           res.data.results.forEach((result) => places.push(result));
//           i++;
//         })
//         .catch((err) => console.error(err));
//     }
//   },
// };

// const main = async () => {
//   try {
//     const directions = await waypointsService.getDirections(start, finish);

//     if (directions) {
//       const json = JSON.stringify(directions);

//       const places = await waypointsService.getPlaces(directions);
//       console.log(places);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
// console.log(waypointsService.getDirections(start, finish));
// console.log(main());
