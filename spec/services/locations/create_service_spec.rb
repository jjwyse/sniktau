describe Locations::CreateService do
  describe 'execute!' do
    it 'creates Locations from an Activity' do
      activity = create(:activity)
      locations = Locations::CreateService.execute!(activity: activity)
      expect(locations).to be_an(Array)
      expect(locations.count).to eq(336)
    end
  end
end