CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id SERIAL UNIQUE NOT NULL,
    user_id UUID DEFAULT public.uuid_generate_v4(),
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(320) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    PRIMARY KEY(id, user_id)
);