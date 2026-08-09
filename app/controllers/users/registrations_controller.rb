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

      flash[:register_errors] = resource.errors.to_hash
      redirect_to accounts_path(tab: "signup")
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
