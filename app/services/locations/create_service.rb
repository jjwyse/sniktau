module Locations
  class CreateService
    def self.execute!(activity:)
      polyline = activity.strava_map_summary_polyline

      # Returns an array of lat/longs
      coordinates = decode(polyline: polyline)

      # Save to DB, converting lat/lng to radians to be consistent with our Mountain lat/lng
      coordinates.map do |coordinate|
        Location.create!(
          activity: activity,
          lat: coordinate[:lat] * (Math::PI / 180),
          lng: coordinate[:lng] * (Math::PI / 180),
        )
      end
    end

    # 99% copy/pasta'ed from GoogleMapsService::Polyline#decode, with one small ~bugfix?
    def self.decode(polyline:)
      points = []
      index = lat = lng = 0

      while index < polyline.length
        result = 1
        shift = 0
        while true
          b = polyline[index].ord - 63 - 1
          index += 1
          result += b << shift
          shift += 5
          break if b < 0x1f
        end
        lat += (result & 1) != 0 ? (~result >> 1) : (result >> 1)

        result = 1
        shift = 0
        while true
          # Bugfix here?
          break if polyline[index].nil?

          b = polyline[index].ord - 63 - 1
          index += 1
          result += b << shift
          shift += 5
          break if b < 0x1f
        end
        lng += (result & 1) != 0 ? ~(result >> 1) : (result >> 1)

        points << {lat: lat * 1e-5, lng: lng * 1e-5}
      end

      points
    end
  end
end