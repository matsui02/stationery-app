FactoryBot.define do
  factory :pencil_case do
    title { "テストユーザーの筆箱" }
    concept { "テストユーザーの筆箱です" }
    association :user

    after(:build) do |pencil_case|
      pencil_case.image.attach(
        io: File.open(Rails.root.join("test/fixtures/files/test_pencil_case.png")),
        filename: "test_pencil_case.png",
        content_type: "image/png"
      )
    end
  end
end
