class PencilCase < ApplicationRecord
  belongs_to :user

  has_many :pencil_case_items, dependent: :destroy
  accepts_nested_attributes_for :pencil_case_items,
                                allow_destroy: true

  has_one_attached :image

  validates :image, presence: true

  validates :title, length: { maximum: 50 }, allow_blank: true
  validates :concept, length: { maximum: 500 }, allow_blank: true

  before_validation :set_default_title

  # Ransackで検索を許可するカラム
  def self.ransackable_attributes(auth_object = nil)
    %w[title concept created_at]
  end

  def self.ransackable_associations(auth_object = nil)
    %w[user pencil_case_items]
  end

  private

  def set_default_title
    self.title = "#{user.name}の筆箱" if title.blank?
  end
end
