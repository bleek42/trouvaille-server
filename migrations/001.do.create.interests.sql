CREATE TYPE keyword AS ENUM ('camping', 'hiking', 'breweries', 'beaches', 'parks', 'zoos', 'museums', 'wineries', 'amusement', 'haunted', 'novelty', 'memorial', 'monuments');

CREATE TABLE "Places" (
  "mapsPlaceId" VARCHAR(150) NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "placeType" KEYWORD NOT NULL,
  "visited" BOOLEAN NOT NULL DEFAULT 'false' CHECK('true' OR 'false')
);

CREATE TABLE "Interests" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL UNIQUE,
  "places" TEXT [] NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);