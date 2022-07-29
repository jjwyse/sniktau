task :seed_mountains => :environment do
  ActiveRecord::Base.transaction do
    file = File.read('./data/mountains.json')
    JSON.parse(file).each do |json_mountain|
      json_mountain.deep_symbolize_keys!

      # Allow re-running
      next if Mountain.where(name: json_mountain[:properties][:NAME]).exists?

      pp "Inserting #{json_mountain[:properties][:NAME]} (#{json_mountain[:properties][:ELEV_METER]}) at (#{json_mountain[:geometry][:coordinates].second}, #{json_mountain[:geometry][:coordinates].first})"

      Mountain.create!(
        name: json_mountain[:properties][:NAME],
        elevation: json_mountain[:properties][:ELEV_METER].presence || 0,
        # Convert from degrees to radians
        lat: json_mountain[:geometry][:coordinates].second * (Math::PI / 180),
        lng: json_mountain[:geometry][:coordinates].first * (Math::PI / 180),
      )
    end
  end
end