class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.string :name
      t.text :image
      t.text :description

      t.timestamps
    end
  end
end
