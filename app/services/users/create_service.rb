require 'net/http'
require 'uri'

module Users
  class CreateService
    def self.execute!(oauth_code:)
      # Exchange OAuth code for access token, and persist User
      request_body = {
        client_id: ENV['STRAVA_CLIENT_ID'],
        client_secret: ENV['STRAVA_CLIENT_SECRET'],
        code: oauth_code,
        grant_type: 'authorization_code',
      }
      url = URI.parse('https://www.strava.com/oauth/token')
      response = Net::HTTP.post(url, request_body.to_json, 'Content-Type': 'application/json')
      response_body = JSON.parse(response.body)

      # Create User
      athlete = response_body['athlete']
      User.create!(
        strava_id: athlete['id'],
        strava_username: athlete['username'],
        strava_first_name: athlete['firstname'],
        strava_last_name: athlete['lastname'],
        strava_city: athlete['city'],
        strava_state: athlete['state'],
        strava_country: athlete['country'],

        strava_access_token: response_body['access_token'],
        strava_refresh_token: response_body['refresh_token'],
        strava_access_token_expires_at: response_body['expires_at'],
      )
    end
  end
end
