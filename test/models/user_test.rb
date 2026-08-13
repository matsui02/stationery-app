require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "有効なユーザーを作成できる" do
    user = User.new(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
    )

    assert user.valid?
  end

  test "ユーザー名が未入力の場合は作成できない" do
    user = User.new(
      name: "",
      email: "test@example.com",
      password: "password"
    )

    refute user.valid?
  end

  test "メールアドレスが未入力の場合は作成できない" do
    user = User.new(
      name: "テストユーザー",
      email: "",
      password: "password"
    )

    refute user.valid?
  end

  test "パスワードが未入力の場合は作成できない" do
    user = User.new(
      name: "テストユーザー",
      email: "test@example.com",
      password: "",
    )

    refute user.valid?
  end

  test "パスワードと確認用パスワードが一致していないと作成できない" do
    user = User.new(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password01",
    )

    refute user.valid?
  end

  test "パスワードと確認用パスワードが一致している場合は作成できる" do
    user = User.new(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password",
    )

    assert user.valid?
  end

  test "メールアドレスが重複していると作成できない" do
    user1 = User.create!(
      name: "テストユーザー",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password",
    )

    user2 = User.new(
      name: "テストユーザー02",
      email: "test@example.com",
      password: "password",
      password_confirmation: "password",
    )

    refute user2.valid?
  end

  test "メールアドレスの形式が不正だと作成できない" do
    user = User.new(
      name: "テストユーザー",
      email: "test",
      password: "password",
      password_confirmation: "password",
    )

    refute user.valid?
  end

  test "パスワードが8文字以下の場合は作成できない" do
    user = User.new(
      name: "テストユーザー",
      email: "test@example.com",
      password: "123",
    )

    refute user.valid?
  end
end
