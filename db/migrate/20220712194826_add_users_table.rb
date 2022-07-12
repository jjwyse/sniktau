class AddUsersTable < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      create table users(
        id uuid primary key default gen_random_uuid(),
        bearer_token text,

        -- Strava-specific attributes from "athlete" object
        strava_id int not null,
        strava_username text not null,
        strava_first_name text not null,
        strava_last_name text not null,
        strava_city text,
        strava_state text,
        strava_country text
      )
    SQL
  end

  def down
    execute <<-SQL
      drop table users;
    SQL
  end
end
