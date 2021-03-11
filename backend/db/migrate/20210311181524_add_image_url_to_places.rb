class AddImageUrlToPlaces < ActiveRecord::Migration[6.1]
  def change
    add_column :places, :ImageUrl, :string
  end
end
