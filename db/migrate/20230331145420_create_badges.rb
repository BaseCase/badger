class CreateBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :badges do |t|
      t.string :name
      t.string :creator_name
      t.jsonb :colors, null: false, default: '[]'
      t.string :slug, null: false, index: { unique: true }

      t.timestamps
    end
  end
end
