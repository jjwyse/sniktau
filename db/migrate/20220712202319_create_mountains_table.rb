class CreateMountainsTable < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      create table mountains(
        id uuid primary key default gen_random_uuid(),
        name text not null,
        elevation integer not null,
        lat double precision not null,
        lng double precision not null,
        created_at timestamp without time zone not null,
        updated_at timestamp without time zone not null
      )
    SQL
  end

  def down
    execute <<-SQL
      drop table mountains;
    SQL
  end
end
