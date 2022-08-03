Rails.application.routes.draw do
  post '/strava/authenticate', to: 'strava#authenticate'
end
