CREATE TABLE users (
  id            serial,
  login         VARCHAR ( 50 ) UNIQUE NOT NULL,
  password      VARCHAR NOT NULL
);