class CreatePencilCases < ActiveRecord::Migration[8.1]
  def change
    create_table :pencil_cases do |t|
      t.string :title
      t.text :concept
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
