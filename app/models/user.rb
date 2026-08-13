class User < ApplicationRecord
  has_many :pencil_cases, dependent: :destroy
  has_one_attached :avatar
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, format: {with: VALID_EMAIL_REGEX}

  validates :name, presence: true

  validates_length_of :password, minimum: 8

  def self.ransackable_attributes(auth_object = nil)
    %w[name]
  end

  private

  def password_require?
    password.present?
  end
end
