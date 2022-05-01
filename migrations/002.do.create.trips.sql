CREATE TABLE trips (
    origin VARCHAR(150) NOT NULL,
    destination VARCHAR(150) NOT NULL,
    waypoints json NOT NULL,
    origin_name TEXT NOT NULL,
    destination_name TEXT NOT NULL,
    user_id INT NOT NULL,
    trip_id SERIAL PRIMARY KEY UNIQUE,
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);