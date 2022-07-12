class CreateUserMountainsTable < ActiveRecord::Migration[7.0]
  def up
    execute <<-SQL
      create table user_mountains(
        id uuid primary key default gen_random_uuid(),
        user_id uuid not null references users(id),
        activity_id uuid not null references activities(id),
        mountain_id uuid not null references mountains(id),
        created_at timestamp without time zone not null,
        updated_at timestamp without time zone not null
      );

      create unique index idx_user_mountains_activity_id_mountain_id_uniq on user_mountains(activity_id, mountain_id);

      create index idx_user_mountains_user_id on user_mountains(user_id);
    SQL
  end

  def down
    execute <<-SQL
      drop table user_mountains;
    SQL
  end
end
