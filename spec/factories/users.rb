FactoryBot.define do
  factory :user do
    strava_id { 1 }
    strava_username { 'frank_ricard' }
    strava_first_name { 'Frank' }
    strava_last_name { 'Ricard' }
  end
end