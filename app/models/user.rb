class User < ApplicationRecord
  validate :strava_id, :strava_username, :strava_first_name, :strava_last_name
end