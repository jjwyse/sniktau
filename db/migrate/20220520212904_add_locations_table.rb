class AddLocationsTable < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
    create table locations (
      id uuid primary key,
      activity_id uuid references activities(id) not null,
      lat double precision not null,
      lng double precision not null
    )
    SQL
  end

  def down
    execute <<-SQL
    drop table activities;
    SQL
  end
end
