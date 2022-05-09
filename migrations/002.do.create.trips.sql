CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    origin VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    waypoints json NOT NULL,
    origin_name TEXT NOT NULL,
    destination_name TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);