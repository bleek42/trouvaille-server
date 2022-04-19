const { Client } = require('@googlemaps/google-maps-services-js');
const axios = require('axios').default;

const { API_KEY } = require('../config.js');

const waypointsService = {
  axiosInstance: axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }),
  googleMapsClient: new Client({ axiosInstance: this.axiosInstance }),

  getDirections(origin, destination) {
    return this.googleMapsClient
      .directions({
        params: {
          origin,
          destination,
        },
      })
      .then((response) => console.info(response))
      .catch((error) => console.error(error));
  },
  // async getPoints(url, origin) {
  //   let points = [];
  //   let endCoords = {};
  //   try {
  //     const response = await axios.get(url);
  //     const data = await response.data;
  //     origin = origin.split(',');
  //     data.routes[0].legs[0].steps.map((step) => {
  //       if (
  //         Math.abs(step.end_location.lat - parseFloat(origin[0])) > 0.03 &&
  //         Math.abs(step.end_location.lng - parseFloat(origin[1])) > 0.03
  //       ) {
  //         points.push(step.end_location);
  //       }
  //       endCoords = data.routes[0].legs[0].end_location;
  //     });
  //     return { points, endCoords };
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  // async getWaypoints(obj) {
  //   endCoords = obj.endCoords
  //   let points = []
  //   for (let i = 0; i < obj.points.length; i++) {
  //     const element = obj.points[i];
  //     radius = obj.radius ? obj.radius : 10000
  //     let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${obj.query.join("+OR+")}&type=tourist_attraction&location=${element.lat},${element.lng}&radius=${radius}&key=${config.API_KEY}`
  //     try {
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       json.results.map((place) => {
  //         points.push({
  //           name: place.name, id: place.place_id, coords: place.geometry.location, photoInfo: place.photos
  //         })
  //       })
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   return { points, endCoords }
  // },

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

console.log(waypointsService.getDirections([26, -3], [87, 19]));

module.exports = waypointsService;
