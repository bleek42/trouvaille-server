const tripsService = {
  getUserTrips(db, userId) {
    return db
      .from('trips')
      .select('*')
      .where('user_id', userId)
      .then((trips) => {
        return this.deserialize(trips);
      });
  },
  addUserTrip(db, userPost) {
    return db
      .insert(this.serialize(userPost))
      .into('trips')
      .returning('*')
      .then((trips) => {
        return trips;
      });
  },
  serialize(trip) {
    return {
      ...trip,
      origin: JSON.stringify(trip.origin),
      destination: JSON.stringify(trip.destination),
      waypoints: JSON.stringify(trip.waypoints),
    };
  },
  deserialize(trip) {
    let arr = [];
    for (let i = 0; i < trip.length; i++) {
      const element = trip[i];
      {
        arr.push({
          origin: JSON.parse(element.origin),
          destination: JSON.parse(element.destination),
          waypoints: JSON.parse(element.waypoints),
          trip_id: element.trip_id,
          user_id: element.user_id,
          origin_name: element.origin_name,
          destination_name: element.destination_name,
        });
      }
    }
    return arr;
  },
};

export default tripsService;
