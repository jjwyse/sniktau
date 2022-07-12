task :seed_mountains => :environment do
  ActiveRecord::Base.transaction do
    file = File.read('./data/mountains.json')
    JSON.parse(file).each do |json_mountain|
      json_mountain.deep_symbolize_keys!
      pp "Inserting #{json_mountain[:properties][:NAME]} (#{json_mountain[:properties][:ELEV_METER]}) at (#{json_mountain[:geometry][:coordinates].second}, #{json_mountain[:geometry][:coordinates].first})"
      Mountain.create!(
        name: json_mountain[:properties][:NAME],
        elevation: json_mountain[:properties][:ELEV_METER].presence || 0,
        lat: json_mountain[:geometry][:coordinates].second,
        lng: json_mountain[:geometry][:coordinates].first,
      )
    end
  end
end