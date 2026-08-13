require "test_helper"

class PencilCaseTest < ActiveSupport::TestCase
  test "筆箱投稿をすることができる" do
    user = User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )

    pencil_case = user.pencil_cases.build(
      title: "テストユーザーの筆箱",
      concept: "テストユーザーの筆箱です"
    )

    pencil_case.image.attach(
    io: File.open(Rails.root.join("test/fixtures/files/test_pencil_case.png")),
    filename: "test_pencil_case.png",
    content_type: "image/png"
    )

    brand = Brand.create!(name: "ペンてる")
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category:category,
    )

    pencil_case.pencil_case_items.build(item: item)

    assert pencil_case.save
  end

  test "タイトルが50文字を超える場合は投稿できない" do
    user = User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )

    pencil_case = user.pencil_cases.build(
      title: "あ" * 51,
      concept: "テストユーザーの筆箱です"
    )

    pencil_case.image.attach(
    io: File.open(Rails.root.join("test/fixtures/files/test_pencil_case.png")),
    filename: "test_pencil_case.png",
    content_type: "image/png"
    )

    brand = Brand.create!(name: "ペンてる")
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category:category,
    )

    pencil_case.pencil_case_items.build(item: item)

    refute pencil_case.save
  end

  test "コンセプトが500文字を超える場合は投稿できない" do
    user = User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )

    pencil_case = user.pencil_cases.build(
      title: "テストユーザー",
      concept: "あ" * 501
    )

    pencil_case.image.attach(
    io: File.open(Rails.root.join("test/fixtures/files/test_pencil_case.png")),
    filename: "test_pencil_case.png",
    content_type: "image/png"
    )

    brand = Brand.create!(name: "ペンてる")
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category:category,
    )

    pencil_case.pencil_case_items.build(item: item)

    refute pencil_case.save
  end

  test "画像が未選択の場合は投稿できない" do
    user = User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )

    pencil_case = user.pencil_cases.build(
      title: "テストユーザー",
      concept: "テストユーザーの筆箱です"
    )

    brand = Brand.create!(name: "ペンてる")
    category = Category.create!(name: "シャーペン")

    item = Item.create!(
      name: "スマッシュ",
      brand: brand,
      category:category,
    )

    pencil_case.pencil_case_items.build(item: item)

   refute pencil_case.save
  end

  test "アイテムが未選択の場合は投稿できない" do
    user = User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password"
    )

    pencil_case = user.pencil_cases.build(
      title: "テストユーザー",
      concept: "テストユーザーの筆箱です"
    )

    refute pencil_case.save
  end
end
