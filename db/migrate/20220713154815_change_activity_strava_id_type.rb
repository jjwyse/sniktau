class ChangeActivityStravaIdType < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      ALTER TABLE activities ALTER COLUMN strava_id TYPE bigint;
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE activities ALTER COLUMN strava_id TYPE int;
    SQL
  end
end
