
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "plan" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR (255) NOT NULL,
    "comments" VARCHAR (4000),
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "user_id" INTEGER REFERENCES "user" ("id")
);

CREATE TABLE "location" (
    "id" SERIAL PRIMARY KEY,
    "location" VARCHAR (255) NOT NULL,
    "date_time" TIMESTAMP NOT NULL,
    "plan_id" INTEGER REFERENCES "plan" ("id")
);
