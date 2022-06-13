# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_05_20_212904) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", id: :uuid, default: nil, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.integer "strava_id", null: false
    t.text "strava_type", null: false
    t.text "strava_name", null: false
    t.decimal "strava_distance", precision: 10, scale: 2, null: false
    t.integer "strava_moving_time", null: false
    t.integer "strava_elapsed_time", null: false
    t.integer "strava_total_elevation_gain", null: false
    t.datetime "strava_start_date", precision: nil
    t.timestamptz "strava_start_date_local"
    t.text "strava_timezone"
    t.text "strava_map_id"
    t.text "strava_map_summary_polyline"
    t.integer "strava_elev_high"
    t.integer "strava_elev_low"
  end

  create_table "locations", id: :uuid, default: nil, force: :cascade do |t|
    t.uuid "activity_id", null: false
    t.float "lat", null: false
    t.float "lng", null: false
  end

  create_table "users", id: :uuid, default: nil, force: :cascade do |t|
    t.text "bearer_token"
    t.integer "strava_id", null: false
    t.text "strava_username", null: false
    t.text "strava_first_name", null: false
    t.text "strava_last_name", null: false
    t.text "strava_city"
    t.text "strava_state"
    t.text "strava_country"
  end

  add_foreign_key "activities", "users", name: "activities_user_id_fkey"
  add_foreign_key "locations", "activities", name: "locations_activity_id_fkey"
end
