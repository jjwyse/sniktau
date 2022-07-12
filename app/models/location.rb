class Location < ApplicationRecord
  belongs_to :activity
  validate :lat, :lng
end