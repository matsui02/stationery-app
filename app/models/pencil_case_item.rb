class PencilCaseItem < ApplicationRecord
  belongs_to :pencil_case
  belongs_to :item
end
