require "test_helper"

class PencilCaseTest < ActiveSupport::TestCase
  test "筆箱投稿をすることができる" do
    user = create(:user)

    pencil_case = build(:pencil_case, user: user)

    brand = create(:brand)
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category: category,
    )

    pencil_case.pencil_case_items.build(item: item)

    assert pencil_case.save
  end

  test "タイトルが50文字を超える場合は投稿できない" do
    user = create(:user)

    pencil_case = build(:pencil_case, title: "あ" * 51, user: user)

    brand = create(:brand)
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category: category,
    )

    pencil_case.pencil_case_items.build(item: item)

    refute pencil_case.save
  end

  test "コンセプトが500文字を超える場合は投稿できない" do
    user = create(:user)

    pencil_case = build(:pencil_case, concept: "あ" * 501, user: user)

    brand = create(:brand)
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category: category,
    )

    pencil_case.pencil_case_items.build(item: item)

    refute pencil_case.save
  end

  test "画像が未選択の場合は投稿できない" do
    user = create(:user)

    pencil_case = build(:pencil_case, user: user)

    # 画像を未選択の状態にする
    pencil_case.image.detach

    brand = create(:brand)
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category: category,
    )

    pencil_case.pencil_case_items.build(item: item)

   refute pencil_case.save
  end

  test "アイテムが未選択の場合は投稿できない" do
    user = create(:user)

    pencil_case = build(:pencil_case, user: user)

    refute pencil_case.save
  end
end
