#########
# USERS #
#########

ActiveRecord::Base.transaction do
  user = (
    if User.find_by(strava_id: 4141857).nil?
      User.create!(
        bearer_token: nil,
        strava_id: 4141857,
        strava_username: 'joshua_wyse',
        strava_first_name: 'Joshua',
        strava_last_name: 'Wyse',
        strava_city: 'Denver',
        strava_state: 'CO',
        strava_country: 'United States',
      )
    else
      User.find_by!(strava_id: 4141857)
    end
  )

  # Create Activities for the User if none exist
  if user.activities.empty?
    strava_activities = JSON.parse(File.read('./data/strava_activities.json'))
    strava_activities.each do |strava_activity|
      strava_activity.deep_symbolize_keys!

      pp "Creating Activity from '#{strava_activity[:name]}' Strava activity"
      activity = Activity.create!(
        user: user,
        strava_id: strava_activity[:id],
        strava_type: 'Run',
        strava_name: strava_activity[:name],
        strava_distance: strava_activity[:distance],
        strava_moving_time: strava_activity[:moving_time],
        strava_elapsed_time: strava_activity[:elapsed_time],
        strava_total_elevation_gain: strava_activity[:total_elevation_gain],
        strava_start_date: strava_activity[:start_date],
        strava_start_date_local: strava_activity[:start_date_local],
        strava_timezone: strava_activity[:timezone],
        strava_map_id: strava_activity[:map][:id],
        strava_map_summary_polyline: strava_activity[:map][:summary_polyline],
        strava_elev_high: strava_activity[:elev_high],
        strava_elev_low: strava_activity[:elev_low],
      )

      pp "Creating Locations"

      # Create Locations for the Activity
      Locations::CreateService.execute!(activity: activity)

      pp "Creating UserMountains"

      # Create UserMountains for the Activity
      UserMountains::CreateService.execute!(activity: activity)
    end
  end
end
