-- strava_user
DROP TABLE IF EXISTS strava_user CASCADE;
CREATE TABLE strava_user (
  id BIGINT PRIMARY KEY,
  email_address TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  sex TEXT NOT NULL,
  photo TEXT,
  bearer_token TEXT NOT NULL
);

-- sniktau_user table
DROP TABLE IF EXISTS sniktau_user CASCADE;
CREATE TABLE sniktau_user (
  id BIGSERIAL PRIMARY KEY,
  strava_id BIGINT NOT NULL REFERENCES strava_user (id) ON DELETE CASCADE,
  last_login TIMESTAMP NOT NULL DEFAULT now()
);

-- user_session table - extinct
DROP TABLE IF EXISTS user_session CASCADE;
