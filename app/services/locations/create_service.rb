module Locations
  class CreateService
    def self.execute!(activity:)
      polyline = activity.strava_map_summary_polyline

      # Returns an array of lat/longs
      coordinates = GoogleMapsService::Polyline.decode(polyline)

      # TODO - bulk create Locations
      coordinates.map do |coordinate|
        Location.create!(
          activity: activity,
          lat: coordinate[:lat],
          lng: coordinate[:lng],
        )
      end
    end
  end
end