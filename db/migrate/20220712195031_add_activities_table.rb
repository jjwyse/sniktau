class AddActivitiesTable < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      create table activities (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) not null,

        -- Strava-specific attributes from "activity" object
        strava_id integer not null,
        strava_type text not null,
        strava_name text not null,
        strava_distance numeric(10, 2) not null,
        strava_moving_time integer not null,
        strava_elapsed_time integer not null,
        strava_total_elevation_gain integer not null,
        strava_start_date timestamp without time zone,
        strava_start_date_local timestamp with time zone,
        strava_timezone text,
        strava_map_id text,
        strava_map_summary_polyline text,
        strava_elev_high integer,
        strava_elev_low integer
      )
    SQL
  end

  def down
    execute <<-SQL
      drop table activities;
    SQL
  end
end
