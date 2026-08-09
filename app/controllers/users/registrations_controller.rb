class Users::RegistrationsController < Devise::RegistrationsController
  def create
    Rails.logger.debug "★ registrations create called ★"
    build_resource(sign_up_params)

    if resource.save
      sign_up(resource_name, resource)
      redirect_to after_sign_up_path_for(resource)
    else
      Rails.logger.debug "=== ERROR ==="
      Rails.logger.debug resource.errors.full_messages.inspect
      @register_resource = resource
      @login_resource = User.new

      render "accounts/show", status: :unprocessable_entity
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
