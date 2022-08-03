class UsersController < ApplicationController
  def create
    # Create the User
    user = Users::CreateService.execute!(oauth_code: params.require(:code))

    render(json: { foo: 'bar' }, status: 200)
  end
end