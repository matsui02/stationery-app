class Users::SessionsController < Devise::SessionsController
  def create
    self.resource = warden.authenticate(auth_options)

    if resource
      sign_in(resource_name, resource)
      flash[:notice] = "ログインしました。"
      redirect_to root_path
    else
      @login_resource = User.new(
        email: params[:user][:email]
      )
      @register_resource = User.new
      flash.now[:alert] = "メールアドレスまたはパスワードが正しくありません"
      @active_tab = "login"
      render "accounts/show",
            status: :unprocessable_entity
    end
  end
end
