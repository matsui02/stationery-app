class Users::SessionsController < Devise::SessionsController
  def new
    @login_resource = User.new
    @register_resource = User.new

    render "accounts/show", status: :unprocessable_entity
  end

  def create
    super do |resource|
      return redirect_to root_path
    end
  end

  protected

  def after_sign_in_path_for(resource)
    root_path
  end
end
