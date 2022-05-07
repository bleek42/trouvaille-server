import type { ClientOptions } from '@googlemaps/google-maps-services-js';
import { AxiosInstance, default as axios, Method } from 'axios';
import { Client } from '@googlemaps/google-maps-services-js';

import { config } from '../config';
export class WaypointsService {
  public mapsClient: Client;
  public axiosInstance: AxiosInstance;
  constructor() {
    (this.axiosInstance = axios.create({
      baseURL: 'https://api.google.com/api/maps',
      method: 'GET',
      headers: { Authorization: `Bearer ${config.MAPS_API_KEY as string}` },
    })),
      (this.mapsClient = new Client({
        axiosInstance: this.axiosInstance,
      }));
  }

  async getDirections(origin, destination) {
    const results = [];
    try {
      const directions = await this.mapsClient.directions({
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

// const waypointsService = new WaypointsService();
// waypointsService.getDirections(start, finish);

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
