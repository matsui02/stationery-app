FactoryBot.define do
  factory :item do
    name { "スマッシュ" }
    association :brand
    association :category
  end
end
