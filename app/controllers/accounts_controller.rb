class AccountsController < ApplicationController
  def show
    # セッションから入力値を復元
    saved_params = session.delete(:register_params) || {}

    @register_resource = User.new(saved_params)

    # エラーをモデルに追加
    if flash[:register_errors].present?
      flash[:register_errors].each do |field, messages|
        messages.each do |message|
          @register_resource.errors.add(field.to_sym, message)
        end
      end
    end

    @login_resource = User.new
  end
end
