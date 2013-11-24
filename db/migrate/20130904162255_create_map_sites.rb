class CreateMapSites < ActiveRecord::Migration
  def change
    create_table :map_sites do |t|
      t.string :lugar

      t.timestamps
    end
  end
end
