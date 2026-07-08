class AccountsController < ApplicationController
  def show
    @register_resource = User.new
    @login_resource = User.new
  end
end
