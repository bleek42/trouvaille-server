CREATE TABLE trips (
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    waypoints TEXT NOT NULL,
    destination_name TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    trip_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY
);