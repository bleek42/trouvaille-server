const express = require("express");
const axios = require('axios').default;

const config = require("../config.js")

const waypointsService = {
  async getPoints(url, origin) {
    let points = []
    let endCoords = {}
    try {
      const response = await fetch(url);
      const json = await response.json();
      origin = origin.split(",")
      json.routes[0].legs[0].steps.map((step) => {
        if (Math.abs(step.end_location.lat - parseFloat(origin[0])) > 0.03 && Math.abs(step.end_location.lng - parseFloat(origin[1])) > 0.03) {
          points.push(step.end_location);
        }
        endCoords = json.routes[0].legs[0].end_location
      });
      return { points, endCoords }
    } catch (error) {
      console.error(error);
    }
  },
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

  fetchWaypoints({ query, points, endCoords, radius = 10000 }) {
    const waypoints = [];
    for (point of points) {
      const lat = points[point].lat;
      const lng = points[point].lng;
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query.join("+OR+")}&type=tourist_attraction&location=${lat},${lng}&radius=${radius}&key=${config.API_KEY}`
      axios.get(url)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}

module.exports = waypointsService

