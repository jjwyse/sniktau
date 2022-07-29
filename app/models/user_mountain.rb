class UserMountain < ApplicationRecord
  belongs_to :user
  belongs_to :activity
  belongs_to :mountain
  validate :user, :activity, :mountain
end