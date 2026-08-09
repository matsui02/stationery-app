class PencilCase < ApplicationRecord
  belongs_to :user

  has_many :pencil_case_items, dependent: :destroy
  accepts_nested_attributes_for :pencil_case_items,
                                allow_destroy: true

  has_one_attached :image

  validates :title, length: { maximum: 50 }, allow_blank: true
  validates :image, presence: true

  validate :must_have_item

  before_validation :set_default_title

  private

  def set_default_title
    self.title = "#{user.name}の筆箱" if title.blank?
  end

  def must_have_item
    if pencil_case_items.none? { |item| item.item_id.present? }
      errors.add(:pencil_case_items, "収納アイテムを1つ以上追加してください")
    end
  end
end
