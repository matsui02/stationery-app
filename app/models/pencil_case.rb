class PencilCase < ApplicationRecord
  belongs_to :user

  has_many :pencil_case_items, dependent: :destroy
  accepts_nested_attributes_for :pencil_case_items,
                                allow_destroy: true

  has_one_attached :image

  validates :image, presence: true
  validate :must_have_item

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

  def must_have_item
    if pencil_case_items.all? { |item| item_empty?(item) }
      errors.add(:pencil_case_items, "収納アイテムを1つ以上追加してください")
    end
  end

  def item_empty?(item)
    item.item_id.blank? &&
    item.new_item_name.blank? &&
    item.new_brand_name.blank? &&
    item.new_category_id.blank?
  end
end
