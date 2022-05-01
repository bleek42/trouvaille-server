CREATE TABLE interests (
    keywords TEXT [] NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    int_id SERIAL PRIMARY KEY UNIQUE REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);