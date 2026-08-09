class Users::SessionsController < Devise::SessionsController
  def new
    @login_resource  = User.new
    @register_resource = User.new
    render "accounts/show"
  end

  def create
    self.resource = warden.authenticate(auth_options)

    if resource
      sign_in(resource_name, resource)
      flash[:notice] = "ログインしました。"
      redirect_to after_sign_in_path_for(resource)
    else
      flash[:alert] = "メールアドレスまたはパスワードが間違っています。"
      redirect_to accounts_path(tab: "login")
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
