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
      # Accumulator
      mountains_close = []

      Mountain.find_each do |mountain|
        # Less than 100 meters away?
        meters_away = Math.acos(Math.sin(lat) * Math.sin(mountain.lat) + Math.cos(lat) * Math.cos(mountain.lat) * Math.cos(lng - mountain.lng)) * 6_371_000
        if meters_away < meters
          mountains_close << mountain
        end

        # Go to the next mountain if we already find we summited this one
        next mountain if mountains_close.include?(mountain)
      end

      mountains_close
    end
  end
end