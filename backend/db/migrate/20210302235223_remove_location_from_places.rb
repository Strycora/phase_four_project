class RemoveLocationFromPlaces < ActiveRecord::Migration[6.1]
  def change
    remove_column :places, :location, :string
  end
end
