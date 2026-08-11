class Item < ApplicationRecord
  belongs_to :brand
  belongs_to :category

  has_many :pencil_case_items

  def self.ransackable_associations(auth_object = nil)
    %w[brand category]
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[id name brand_id category_id]
  end
end
