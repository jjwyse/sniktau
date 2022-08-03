class StravaController < ApplicationController
  def authenticate
    code = params.require(:code)
    pp code

    render(json: {foo: 'bar'}, status: 200)
  end
end