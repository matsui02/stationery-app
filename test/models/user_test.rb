require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "有効なユーザーを作成できる" do
    user = build(:user)

    assert user.valid?
  end

  test "ユーザー名が未入力の場合は作成できない" do
    user = build(:user, name: "")

    refute user.valid?
  end

  test "メールアドレスが未入力の場合は作成できない" do
    user = build(:user, email: "")

    refute user.valid?
  end

  test "パスワードが未入力の場合は作成できない" do
    user = build(:user, password: "")

    refute user.valid?
  end

  test "パスワードと確認用パスワードが一致していないと作成できない" do
    user = build(:user, password: "password", password_confirmation: "password02")

    refute user.valid?
  end

  test "パスワードと確認用パスワードが一致している場合は作成できる" do
    user = build(:user)
    assert user.valid?
  end

  test "メールアドレスが重複していると作成できない" do
    user1 = create(:user)
    user2 = build(:user)

    refute user2.valid?
  end

  test "メールアドレスの形式が不正だと作成できない" do
    user = build(:user, email: "test")

    refute user.valid?
  end

  test "パスワードが8文字以下の場合は作成できない" do
    user = build(:user, password: "123")

    refute user.valid?
  end
end
