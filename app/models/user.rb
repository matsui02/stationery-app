class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true

  validates :email,
            format: {
              with: URI::MailTo::EMAIL_REGEXP,
              message: "の形式が正しくありません"
            },
            allow_blank: true

  validates :password, length: { minimum: 8 }, if: :password_required?

  private

  def password_require?
    password.present?
  end
end
