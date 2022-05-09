CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY REFERENCES trips(user_id) ON DELETE CASCADE,
    id UUID DEFAULT public.uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE interests ADD FOREIGN KEY (created_by) REFERENCES users(username);