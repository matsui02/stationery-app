class CreatePencilCaseItems < ActiveRecord::Migration[8.1]
  def change
    create_table :pencil_case_items do |t|
      t.references :pencil_case, null: false, foreign_key: true
      t.references :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
