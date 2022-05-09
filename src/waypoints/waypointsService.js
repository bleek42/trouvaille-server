const { Client } = require('@googlemaps/google-maps-services-js');
const { directions } = require('@googlemaps/google-maps-services-js/dist/directions.js');
const axios = require('axios').default;

const { MAPS_API_KEY } = require('../config');

const waypointsService = {
  axiosInstance: axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
    method: 'GET',
  }),
  googleMapsClient: new Client({ axiosInstance: this.axiosInstance }),

  isValidWaypointReq(origin, destination) {
    // const usStateRegex =
    //   /((A[LKZR])|(C[AOT])|(D[EC])|(FL)|(GA)|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EDAINSOT])|(N[EVHJMYCD])|(O[HKR])|(PA)|(RI)|(S[CD])|(T[NX])|(UT)|(V[TA])|(W[AVIY]))$/i;
    // const isUsState =
    //   (typeof origin === 'string' && usStateRegex.test(origin)) ||
    //   (typeof destination === 'string' && usStateRegex.test(destination));

    const isGooglePlaceId =
      (typeof origin === 'string' && origin.startsWith('place_id:')) ||
      (typeof destination === 'string' && destination.startsWith('place_id:'));

    const isLatLng =
      !Number.isNaN((origin.lat && origin.lng) || (origin[0] && origin[1])) ||
      !Number.isNaN((destination.lat && destination.lng) || (destination[0] && destination[1]));

    return !!(isGooglePlaceId || isLatLng || isUsState);
  },

  async getDirections(origin, destination) {
    // eslint-disable-next-line no-shadow
    const directions = await this.googleMapsClient.directions({
      params: {
        origin,
        destination,
        key: MAPS_API_KEY,
      },
    });
    const { status } = directions.data;
    if (status !== 'OK') {
      return null;
    }
    const steps = directions.data?.routes[0]?.legs[0]?.steps;
    return steps;
  },

  async getPlaces(location, keyword, radius) {
    const nearby = await this.googleMapsClient.placesNearby({
      params: {
        keyword,
        location,
        radius,
        type: 'tourist_attraction',
        key: MAPS_API_KEY,
      },
    });
    const { status } = nearby.data;
    if (status !== 'OK') {
      return null;
    }
    const placeResults = nearby?.data?.results;
    // const placeNextPageToken = nearby?.data?.next_page_token;
    return placeResults;
  },

  async getRecommendations(origin, destination, keyword, radius) {
    const recommendations = [];
    const steps = await this.getDirections(origin, destination);
    for await (const step of steps) {
      const places = await this.getPlaces(step.end_location, keyword, radius);
      recommendations.push(places);
    }
    console.log(recommendations);
    return recommendations;
  },
};

const start = 'place_id:ChIJaRPGrLxrrIkR--TUxRh2DPA';
const finish = 'place_id:ChIJlwTn0JFdxokRB2e-P-ror2Q';
console.log(waypointsService.getRecommendations(start, finish, 'monuments', 40000));

module.exports = waypointsService;
