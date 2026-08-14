FactoryBot.define do
  factory :pencil_case_item do
    association :pencil_case
    association :item
  end
end
