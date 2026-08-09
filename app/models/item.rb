class Item < ApplicationRecord
  belongs_to :brand
  belongs_to :category

  has_many :pencil_case_items
end
