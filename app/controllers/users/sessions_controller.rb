class Users::SessionsController < Devise::SessionsController
  def new
    @login_resource = User.new
    @register_resource = User.new

    render "accounts/show", status: :unprocessable_entity
  end

  def create
    super do |resource|
      if resource.persisted?
        flash[:notice] = "ログインしました。"
      end
    end
  end

  def destroy
    super
    flash[:notice] = "ログアウトしました。"
  end

  protected

  def after_sign_in_path_for(resource)
    root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end
