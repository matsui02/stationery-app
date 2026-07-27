class AccountsController < ApplicationController
  def show
    @active_tab = params[:tab] || "sign_up"
    @register_resource = User.new
    @login_resource = User.new
  end
end
