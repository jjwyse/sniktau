class Mountain < ApplicationRecord
  validate :elevation, :lat, :lng
end