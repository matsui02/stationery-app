class PencilCaseItem < ApplicationRecord
  attr_accessor :new_item_name, :new_brand_name, :new_category_id

  belongs_to :pencil_case
  belongs_to :item

  validate :must_have_complete_item

  CATEGORIES = [ "ペン", "シャープペン", "消しゴム", "ノート", "定規", "その他" ]

  def self.ransackable_associations(auth_object = nil)
    %w[item]
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[pencil_case_id item_id]
  end

  def must_have_complete_item
    return if new_item_name.blank? &&
            new_brand_name.blank? &&
            new_category_id.blank?

    if new_item_name.blank? ||
       new_brand_name.blank? ||
       new_category_id.blank?

      errors.add(:base, "商品名・ブランド・カテゴリをすべて入力してください")
    end
  end
end
