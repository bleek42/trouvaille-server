import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://ian@localhost/trouvaille',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://ian@localhost/trouvaille_test',
  JWT_SECRET:
    process.env.JWT_SECRET ||
    'c4c35a9d6aaf6b10b90c66bdd96f769c76246170d64b53209c0b765640fb3bcd4529db7421827d412f968c2b90524084cb3a6fece1a8f288e93e59071e2fa5f7',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  MAPS_API_KEY: process.env.MAPS_API_KEY,
};
