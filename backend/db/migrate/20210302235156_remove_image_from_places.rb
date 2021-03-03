class RemoveImageFromPlaces < ActiveRecord::Migration[6.1]
  def change
    remove_column :places, :image, :text
  end
end
