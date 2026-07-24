class PencilCaseItem < ApplicationRecord
  belongs_to :pencil_case
  belongs_to :item

  CATEGORIES = ["ペン", "シャープペン", "消しゴム", "ノート", "定規", "その他"]
end
