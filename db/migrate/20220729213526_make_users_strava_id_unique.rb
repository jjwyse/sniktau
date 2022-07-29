class MakeUsersStravaIdUnique < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      CREATE UNIQUE INDEX index_unique_users_strava_id on users(strava_id);
    SQL
  end

  def down
    execute <<-SQL
      DROP INDEX index_unique_users_strava_id;
    SQL
  end
end
