module UserMountains
  class CreateService

    def self.execute!(activity:)
      # Find any Mountains close to the given Activity
      mountains = activity
        .locations
        .map { |location| mountains_within(lat: location.lat, lng: location.lng) }
        .compact
        .flatten
        .uniq

      # Create the UserMountains
      mountains.each do |mountain|
        UserMountain.create!(user: activity.user, activity: activity, mountain: mountain)
      end
    end

    # @!attribute lat - radians
    # @!attribute lng - radians
    def self.mountains_within(lat:, lng:, meters: 100)
      sql = <<-SQL
        select m.id from mountains m
        where (acos(sin(#{lat}) * sin(m.lat) + cos(#{lat}) * cos(m.lat) * cos(#{lng} - m.lng)) * 6371000) < #{meters};
      SQL

      entries = ActiveRecord::Base.connection.execute(sql)

      Mountain.where(id: entries.map { |entry| entry['id']} ).distinct
    end
  end
end