-- strava_user
DROP TABLE IF EXISTS strava_user;
CREATE TABLE strava_user (
  id BIGINT PRIMARY KEY,
  email_address TEXT NOT NULL
);

-- sniktau_user table
DROP TABLE IF EXISTS sniktau_user;
CREATE TABLE sniktau_user (
  id BIGSERIAL PRIMARY KEY,
  strava_id BIGINT NOT NULL REFERENCES strava_user (id) ON DELETE CASCADE
);

-- user_session table
DROP TABLE IF EXISTS user_session;
CREATE TABLE user_session (
  sniktau_user_id BIGSERIAL NOT NULL REFERENCES sniktau_user (id) ON DELETE CASCADE,
  token TEXT PRIMARY KEY,
  strava_bearer_token TEXT NOT NULL
);
