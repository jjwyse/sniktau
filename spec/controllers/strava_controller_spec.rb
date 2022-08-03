describe StravaController do
  describe '#authenticate' do
    it 'exchanges a code for an access token' do
      post(:authenticate, params: { code: 'abcd' })
    end
  end
end