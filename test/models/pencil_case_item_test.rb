require "test_helper"

class PencilCaseItemTest < ActiveSupport::TestCase
  test "アイテムが未選択の場合は作成できない" do
    pencil_case_item = build(:pencil_case_item, item: nil)

    refute pencil_case_item.valid?
  end
end
