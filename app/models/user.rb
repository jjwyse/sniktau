class User < ApplicationRecord
  has_many :activities
  has_many :locations, through: :activities
  has_many :user_mountains
  validate :strava_id, :strava_username, :strava_first_name, :strava_last_name
end