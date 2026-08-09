class User < ApplicationRecord
  has_many :pencil_cases, dependent: :destroy
  has_one_attached :avatar
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true

  private

  def password_require?
    password.present?
  end
end
