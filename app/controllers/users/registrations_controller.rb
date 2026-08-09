class Users::RegistrationsController < Devise::RegistrationsController
  def create
    build_resource(sign_up_params)

    if resource.save
      sign_up(resource_name, resource)
      flash[:notice] = "登録が完了しました。"
      redirect_to root_path
    else
      @register_resource = resource
      @login_resource = User.new
      @active_tab = "sign_up"
      render "accounts/show",
            status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end
end
