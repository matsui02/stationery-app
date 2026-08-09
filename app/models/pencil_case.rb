class PencilCase < ApplicationRecord
  belongs_to :user
  has_many :pencil_case_items
  has_one_attached :image

  validates :title, length: { maximum: 50 }, allow_blank: true

  # 未入力時にデフォルトタイトルを自動生成
  before_validation :set_default_title

  private

  def set_default_title
    self.title = "#{user.name}の筆箱" if title.blank?
  end
end
