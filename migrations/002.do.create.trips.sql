CREATE TABLE "RoadTrips" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES "Interests" ON DELETE RESTRICT,
  "title" VARCHAR(80) NOT NULL,
  "origin" VARCHAR(60) NOT NULL,
  "destination" VARCHAR(60) NOT NULL,
  "tripKeywords" KEYWORD[] NOT NULL,
  "steps" JSON NOT NULL,
  "waypoints" JSON NOT NULL,
  "originName" TEXT NOT NULL,
  "destinationName" TEXT NOT NULL,
  "distance" NUMERIC CHECK("distance" > 0) NOT NULL,
  "hasStarted" BOOLEAN CHECK('true' OR 'false') DEFAULT 'false',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);